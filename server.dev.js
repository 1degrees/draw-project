/**
 * @file server.js
 * @author lavas
 */

const LavasCore = require('lavas-core-vue');
const express = require('express');
const stoppable = require('stoppable');
const proxyMiddleware = require('http-proxy-middleware')
const lavasConfig = require('./lavas.config.js');

let port = process.env.PORT || 3000;
let core = new LavasCore(__dirname);
let app;
let server;

function startDevServer() {
    app = express();
    core.build()
        .then(() => {            
            Object.keys(lavasConfig.proxyTable).forEach(function (context) {
                let options = lavasConfig.proxyTable[context]
                if (typeof options === 'string') {
                  options = { target: options }
                }
                app.use(proxyMiddleware(options.filter || context, options))
              })      
            app.use(core.expressMiddleware());

            /**
             * server.close() only stop accepting new connections,
             * we need to close existing connections with help of stoppable
             */
            server = stoppable(app.listen(port, () => {
                console.log('server started at localhost:' + port);
            }));
        }).catch(err => {
            console.log(err);
        });
}

let config;

// fix https://github.com/lavas-project/lavas/issues/50
if (process.argv.length >= 3 && process.argv[2] !== 'dev') {
    config = process.argv[2];
}

/**
 * every time lavas rebuild, stop current server first and restart
 */
core.on('rebuild', () => {
    core.close().then(() => {
        server.stop();
        startDevServer();
    });
});

core.init(process.env.NODE_ENV || 'development', true, {config})
    .then(() => startDevServer());

// catch promise error
process.on('unhandledRejection', err => {
    console.warn(err);
});

