const path = require('path')
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env: env,
    root: rootPath,
    app: {
      name: 'device-sense-dev'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/device-sense-dev'
  },

  test: {
    env: env,
    root: rootPath,
    app: {
      name: 'device-sense-test'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/device-sense-test'
  },

  production: {
    env: env,
    root: rootPath,
    app: {
      name: 'device-sense-prod'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/device-sense-prod'
  }
};

module.exports = config[env];