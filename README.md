# device-sense-js
## app to configure subscriptions to opc-ua servers

### Para instalar el proyecto se deberan correr los siguientes comandos:
    git clone https://github.com/TheEdu/device-sense-js.git
    cd ./device-sense-js
    npm install

### Luego se debera crear una base de datos y configurar las credenciales de la misma en ./config/database.json. Una vez creada se deberar correr las migraciones y los seed (datos de prueba):
    npm run sequelize db:migrate
    npm run sequelize db:seed:all

### Para correr el proyecto con nodemon (dependencia de node que nos permite hacer cambios en el proyecto sin tener que recargarlo en el motor) utilizamos:
    npm run dev

### Luego desde nuestro navegador ingresamos a:
    http://localhost:3000


