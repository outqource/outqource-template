import path from 'path';
import { ParseEnv } from 'outqource-node';

type ENV = {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  CLIENT_URL: string;

  SWAGGER_PATH: string;
  SWAGGER_URLS: string;
  SOFT_DELETE_MODELS: string;
  JWT_KEY: string;
  AES_KEY: string;
  PASSWORD_SALT: number;
  SOCIAL_SALT: number;
  KAKAO_KEY: string;
  KAKAO_ADMIN_KEY: string;
  KAKAO_SECRET_KEY: string;
  KAKAO_REDIRECT_URL: string;
  GOOGLE_KEY: string;
  GOOGLE_SECRET_KEY: string;
  GOOGLE_REDIRECT_URL: string;
  SLACK_VERIFY_TOKEN: string;
  SLACK_SIGNING_SECRET: string;
  SLACK_CLIENT_SECRET: string;
  SLACK_CLIENT_ID: string;
  SLACK_BOT_TOKEN: string;
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
  NAVER_REDIRECT_URL: string;
};

const parseEnv = new ParseEnv({ options: { path: path.join(__dirname, '../../.env') } }, [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'CLIENT_URL',
  'SWAGGER_PATH',
  'SWAGGER_URLS',
  'SOFT_DELETE_MODELS',
  'JWT_KEY',
  'AES_KEY',
  'PASSWORD_SALT',
  'SOCIAL_SALT',
  'KAKAO_KEY',
  'KAKAO_ADMIN_KEY',
  'KAKAO_SECRET_KEY',
  'KAKAO_REDIRECT_URL',
  'GOOGLE_KEY',
  'GOOGLE_SECRET_KEY',
  'GOOGLE_REDIRECT_URL',
  'SLACK_VERIFY_TOKEN',
  'SLACK_SIGNING_SECRET',
  'SLACK_CLIENT_SECRET',
  'SLACK_CLIENT_ID',
  'SLACK_BOT_TOKEN',
  'NAVER_CLIENT_ID',
  'NAVER_CLIENT_SECRET',
  'NAVER_REDIRECT_URL',
]);

const config = parseEnv.result as ENV;

console.log('💙 Config Loading...', config);

export default config;
