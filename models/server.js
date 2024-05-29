const express = require('express');
const cors = require('cors');
const helmet  = require('helmet');
const compression = require('compression');
const http   = require('http');
const fs = require('fs');
const hbs = require('hbs');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.HTTP_PORT;  
        
        this.serverHttp = http.createServer(this.app);

        this.paths = {
            qr:         '/api/qr',
            login:      '/api/login',
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        this.app.use( helmet({contentSecurityPolicy: false} ));
        this.app.use(compression());

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
        
        // handlebars
        this.app.set('view engine', 'hbs');
    }
    

    routes() {
console.log( 'Aplicando rutas');
console.log( `   post en ${this.paths.login}`);
console.log( `   post en ${this.paths.qr}`);

        this.app.use( this.paths.login, require('../routes/login'))
        this.app.use( this.paths.qr, require('../routes/qr'))
    }

    listen() {
        this.serverHttp.listen( this.port, process.env.IP );
        console.log(`Servidor corriendo en puerto ${this.port}` );
    }
}

module.exports = Server;
