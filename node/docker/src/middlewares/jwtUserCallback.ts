import { Jsonwebtoken } from 'outqource-node';
import config from 'config';
import Prisma from 'database';

const jwt = new Jsonwebtoken(config.JWT_KEY);

export type JWTPayload = { id: string; userType: UserType; key: string };

export enum UserType {}

const jwtUserCallback = async (accessToken: string) => {
  const userPayload: JWTPayload = jwt.verifyJwt<JWTPayload>(accessToken);
  if (!userPayload?.id || !userPayload.userType) {
    return null;
  }
  const { id, userType } = userPayload;

  return { id, userType };
};

export default jwtUserCallback;
