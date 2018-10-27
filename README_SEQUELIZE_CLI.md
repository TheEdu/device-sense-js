# Comandos para utilizar sequelize cli.

### Para utlizar los comandos de sequelize cli dentro de la estructura de la aplicacion se definio un archivo de configuracion "sequelize_cli.js", en el cual se especifican las rutas en las que se almacenaran los distintos archivos.

### Para utilizar las opciones de configuracion definidas en "sequelize_cli.js" es necesario correr el comando "sequelize" con el "options-path" seteado a la la ubicacion del archivo de configuracion:
	* sequelize --options-path=./config/sequelize_cli.js

### El comando "sequelize --options-path=./config/sequelize_cli.js" se definio en el package.json con el alias sequelize, asi que para utilizar las distintas acciones de sequelize cli, podemos utilizar tambien:
	* npm run sequelize

### En caso de necesitar agregar opciones al comando de sequelize cli debemos anteponer "--" antes de definir las opciones:
	* npm run sequelize model:generate -- (y aca llamamos a las diferentes opciones)
	* npm run sequelize model:generate -- --name User --attributes firstName:string,lastName:string,email:string

### Comandos Utiles de Sequelize Cli

#### To create an empty project you will need to execute init command
	* npm run sequelize init
	

#### To create model and migration
	 * npm run sequelize model:generate -- --name User --attributes firstName:string,lastName:string,email:string
	
#### To run migration
	 * npm run sequelize db:migrate

#### To undo migration	
	 * npm run sequelize db:migrate:undo
	 * npm run sequelize db:migrate:undo:all

#### To create seed
	 * npm run sequelize seed:generate -- --name seed-name
	

#### To run seed
	 * npm run sequelize db:seed:all

#### To undo seed
	 * npm run sequelize db:seed:undo
	 * npm run sequelize db:seed:undo:all

### Documentacion
* http://docs.sequelizejs.com/manual/
* http://docs.sequelizejs.com/manual/tutorial/migrations.html
* http://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/