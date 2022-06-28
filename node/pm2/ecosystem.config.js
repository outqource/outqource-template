module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/index.js',
      watch: false,
      exec_mode: 'cluster',
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      interpreter: 'node_modules/.bin/ts-node',
      instances: 0,
    },
  ],
};
