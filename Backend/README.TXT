! IMPORTANTE !
ejecute en el terminal en la direccion de la carpeta Backend
para la creacion de la carpeta node_modules
    npm i

antes de ejecutar hay que cambiar unos datos en el archivo database.js
que se encuentra en la carpeta database en el src

    export const sequelize = new Sequelize('SoloCauchos', 'postgres', 'hola', {
        host: 'localhost',
        dialect: 'postgres'
    });

    el dato a cambiar es el "hola " por su contraceña que tenga en el pgAdmin

para ejecutar use el comando desde el teminal en ubicado en la carpeta Backend
    node ./src/index.js

