import type { Request, Response } from 'express';
import axios from 'axios';
import queryString from 'query-string';
import config from '../../config';

export type GoogleUser = {
  id: string;
  nickname: string;
  email: string;
  profileImage?: string;
};

export interface TGoogleCallback {
  token: string;
  user: GoogleUser;
}

const GOOGLE_AUTH_URL_PARAMS = queryString.stringify({
  client_id: config.GOOGLE_KEY,
  redirect_uri: config.GOOGLE_REDIRECT_URL,
  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
    ' '
  ), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?${GOOGLE_AUTH_URL_PARAMS}`;

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_WEB_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const GOOGLE_USER_URL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

const getRestGoogle = (res: Response): void => {
  res.redirect(GOOGLE_AUTH_URL);
};

const getGoogleToken = async (code: string): Promise<string | undefined> => {
  const data = {
    client_id: config.GOOGLE_KEY,
    client_secret: config.GOOGLE_SECRET_KEY,
    redirect_uri: config.GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
    code,
  };

  try {
    const response = await axios.post(GOOGLE_TOKEN_URL, data);

    return response.data?.access_token;
  } catch (error) {
    return undefined;
  }
};

const getGoogleUser = async (token: string): Promise<GoogleUser | undefined> => {
  try {
    const response = await axios.get(`${GOOGLE_USER_URL}${token}`);
    const { id, email, name: nickname, picture: profileImage } = response.data;
    return {
      id,
      email,
      nickname,
      profileImage,
    };
  } catch (error: any) {
    const { response } = error;
    console.log(response.data);
    if (response.data.error === 'invalid_token') throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
    return undefined;
  }
};

const getGoogleUserInfo = async (token: string): Promise<GoogleUser | undefined> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(GOOGLE_USER_WEB_URL, { headers });

    const { id, email, name: nickname, picture: profileImage } = response.data;

    if (response.data.error === 'invalid_token') {
      throw { status: 401, message: 'TOKEN_EXPIRED' };
    }

    return {
      id,
      email,
      nickname,
      profileImage,
    };
  } catch (error: any) {
    const { response } = error;

    if (response.data.error === 'invalid_token') throw { status: 403, message: 'GOOGLE_TOKEN_EXPIRED' };
    return undefined;
  }
};

const getRestGoogleCallback = async (code: string): Promise<TGoogleCallback> => {
  try {
    const user = await getGoogleUserInfo(code);
    if (!user) {
      throw { status: 500, message: '구글 유저정보 발급 오류!' };
    }

    return { token: code, user };
  } catch (error: any) {
    return error;
  }
};

export { getRestGoogle, getGoogleToken, getGoogleUser, getRestGoogleCallback, getGoogleUserInfo };
