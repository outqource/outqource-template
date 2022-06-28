import type { Request, Response } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import config from '../../config';

export type KakaoUser = {
  id: string;
};

export interface TKakaoCallback {
  token: string;
  user: KakaoUser;
}

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.KAKAO_KEY}&redirect_uri=${config.KAKAO_REDIRECT_URL}&response_type=code`;

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';

const getRestKakao = (res: Response): void => {
  res.redirect(KAKAO_AUTH_URL);
};

const getKakaoToken = async (code: string, redirectUri?: string): Promise<string | undefined> => {
  const data = queryString.stringify({
    grant_type: 'authorization_code',
    client_id: config.KAKAO_KEY,
    client_secret: config.KAKAO_SECRET_KEY,
    redirectUri: redirectUri || config.KAKAO_REDIRECT_URL,
    code,
  });

  try {
    const response = await axios.post(KAKAO_TOKEN_URL, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const token = response.data?.access_token;
    return token;
  } catch (error) {
    return undefined;
  }
};

const getKakaoUser = async (token: string): Promise<{ id: string } | undefined> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  try {
    const response = await axios.get(KAKAO_USER_URL, {
      headers,
    });
    const { id } = response.data;

    return { id };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getRestKakaoCallback = async (code: string): Promise<TKakaoCallback> => {
  try {
    const token = await getKakaoToken(code);
    if (!token) {
      throw { status: 400, message: '카카오 토큰 발급 오류!' };
    }

    const user = await getKakaoUser(token);
    if (!user) {
      throw { status: 500, message: '카카오 유저정보 발급 오류!' };
    }

    return { token, user };
  } catch (error) {
    const e = error as any;
    return e;
  }
};

const logoutKakaoUser = async (id: string) => {
  try {
    const headers = {
      Authorization: `KakaoAK ${config.KAKAO_ADMIN_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const data = queryString.stringify({
      target_id_type: 'user_id',
      target_id: id,
    });

    const response = await axios.post('https://kapi.kakao.com/v1/user/logout', data, { headers });

    return response.data;
  } catch (err: any) {
    return err;
  }
};

export { getRestKakao, getKakaoToken, getKakaoUser, getRestKakaoCallback, logoutKakaoUser };
