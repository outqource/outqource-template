import express from 'express';
import bodyParser from 'body-parser';
import initApp from './app';
import config from './config/index';
import database from 'database';
import jwtUserCallback from 'middlewares/jwtUserCallback';

(async () => {
  await database.$connect();

  await initApp.init();
  console.log('⭐️ OpenAPI created!');
  initApp.app.use(express.json({ limit: '50mb' }));
  initApp.app.use(express.urlencoded({ limit: '50mb' }));
  initApp.app.use(bodyParser.json({ limit: '50mb' }));
  initApp.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  initApp.middlewares([], { jwtUserCallback });
  initApp.routers({
    globalOptions: {
      html: '<h1>Medis 0.0.1</h1>',
      status: 200,
    },
  });

  initApp.app.listen(config.PORT, () => {
    console.log(`🚀 Sever Listening on ${config.PORT}...`);
  });
})();
