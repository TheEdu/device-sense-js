const path = require('path')
const rootPath = require('./config').root

module.exports =  {
  'config': path.join(rootPath, '/config/database.json'),
  'migrations-path': path.join(rootPath, '/database/migrations'),
  'seeders-path': path.join(rootPath, '/database/seeders'),
  'models-path': path.join(rootPath, '/app/models'),
}
