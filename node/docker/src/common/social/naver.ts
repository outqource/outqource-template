import type { Request, Response } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import config from 'config';
import { nanoid } from 'nanoid';

type NaverUser = {
  id: string;
  email: string;
  gender: 'F' | 'M' | 'U';
  age: string;
  phoneNumber: string;
};

type NaverCallback = {
  token: string;
  tokenType: string;
  user: NaverUser;
};

const NAVER_CODE = nanoid(5);
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&state=${NAVER_CODE}&redirect_url=${config.NAVER_REDIRECT_URL}&client_id=${config.NAVER_CLIENT_ID}`;
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token?';
const NAVER_USER_URL = 'https://openapi.naver.com/v1/nid/me';
const getRestNaver = (res: Response) => {
  res.redirect(NAVER_AUTH_URL);
};

const getNaverToken = async (
  code: string,
  redirectUri?: string
): Promise<{ token: string; tokenType: string } | undefined> => {
  const data = queryString.stringify({
    grant_type: 'authorization_code',
    client_id: config.NAVER_CLIENT_ID,
    client_secret: config.NAVER_CLIENT_SECRET,
    code,
  });

  try {
    const response = await axios.get(NAVER_TOKEN_URL + data);
    const token = response.data?.access_token;
    const tokenType = response.data?.token_type;
    return { token, tokenType };
  } catch (err) {
    return undefined;
  }
};

const getNaverUser = async (token: string): Promise<NaverUser | undefined> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  try {
    const response = await axios.get(NAVER_USER_URL, { headers });
    const { response: naverResponse } = response.data;

    const { id, email, gender, age, mobile: phoneNumber } = naverResponse;

    return {
      id,
      email,
      gender,
      age,
      phoneNumber,
    };
  } catch (err) {
    return undefined;
  }
};
const getRestNaverCallback = async (code: string): Promise<NaverCallback | null> => {
  try {
    const tokenInfo = await getNaverToken(code);

    if (!tokenInfo) {
      throw { status: 400, message: '네이버 토큰 발급 오류!' };
    }

    const user = await getNaverUser(tokenInfo.token);
    if (!user) {
      throw { status: 500, message: '네이버 유저정보 발급 오류!' };
    }

    return { ...tokenInfo, user };
  } catch (error) {
    const e = error as any;
    return null;
  }
};

export { getRestNaver, getNaverToken, getNaverUser, getRestNaverCallback };
