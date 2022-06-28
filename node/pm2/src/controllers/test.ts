import type { ControllerAPI, ExpressController } from 'outqource-node';

export const testAPI: ControllerAPI = {
  tags: ['TEST'],
  summary: '연결 테스트 API',
  path: '/test',
  method: 'GET',
};

export const test: ExpressController = async (req, res, next) => {
  res.status(200).json({ response: 'Welcome' });
};

export const testPostAPI: ControllerAPI = {
  tags: ['TEST'],
  summary: '연결 테스트 API',
  path: '/test',
  method: 'POST',
  body: [
    { key: 'foo', type: 'number', example: 123 },
    { key: 'bar', type: 'string', example: 'bar' },
  ],
};

export const testPost: ExpressController = async (req, res, next) => {
  res.status(200).json({ response: 'Welcome' });
};
