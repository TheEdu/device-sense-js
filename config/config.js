const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const currentEnv = process.env.NODE_ENV || 'development'
const database = require('./database.json')[currentEnv]

const config = {
  development: {
    env: 'development',
    port: process.env.PORT || 3000,
    db: database,
    root: rootPath,
    app: {
      name: 'device-sense-dev'
    }
  },

  test: {
    env: 'test',
    port: 80,
    db: database,
    root: rootPath,
    app: {
      name: 'device-sense-test'
    }
  },

  production: {
    env: 'production',
    port: 80,
    db: database,
    root: rootPath,
    app: {
      name: 'device-sense-prod'
    }
  }
};

module.exports = config[currentEnv]