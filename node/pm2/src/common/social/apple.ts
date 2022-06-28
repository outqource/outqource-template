import type { Response } from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import AppleAuth from 'apple-auth';

import AppleConfig from '../../config/apple.config.json';

export type AppleUser = {
  id: string;
  email?: string;
};

export interface TAppleCallback {
  user: AppleUser;
}

const appleAuth = new AppleAuth(
  AppleConfig,
  path.join(__dirname, `../../config/apple/${AppleConfig.private_key_path}`),
  'text'
);

const getRestApple = (res: Response) => {
  res.redirect(appleAuth.loginURL());
};

const getAppleUser = async (id_token: string): Promise<AppleUser | undefined> => {
  try {
    const idToken = jwt.decode(id_token) as {
      sub: string;
      email?: string;
    };

    if (!idToken?.sub) return undefined;
    const user: AppleUser = {
      id: idToken.sub as string,
    };

    if (idToken.email) user.email = idToken.email;
    return user;
  } catch (error) {
    return undefined;
  }
};

const getRestAppleCallback = async (code: string): Promise<TAppleCallback> => {
  try {
    const user = await getAppleUser(code);

    if (!user) throw { status: 500, message: '애플 유저 정보 발급 오류!' };

    return { user };
  } catch (error) {
    const err = error as any;
    return err;
  }
};

export { getRestApple, getAppleUser, getRestAppleCallback };
