import { InitApp } from 'outqource-node/express';
import type { OpenAPIOptions } from 'outqource-node/openapi';

import config from 'config/index';
import controllers from 'controllers';

import path from 'path';

const openAPIOptions: OpenAPIOptions = {
  title: '메디스 서버',
  version: '0.0.1',
  urls: (config.SWAGGER_URLS || '')?.split(','),
};

const initApp = new InitApp({
  controllers,
  openAPI: {
    path: path.join(__dirname, config.SWAGGER_PATH),
    options: openAPIOptions,
    endPoint: '/api-docs',
  },
});

export default initApp;
