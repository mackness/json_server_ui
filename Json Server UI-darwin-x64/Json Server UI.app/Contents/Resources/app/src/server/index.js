const createError = require('http-errors');
const http = require('http');
const express = require('express');
const request = require('request');
const path = require('path');
const logger = require('morgan');
const appRootDir = require('app-root-dir');
const enableDestroy = require('server-destroy');
const jsonServer = require('json-server');
const fs = require('fs');
const { shell, Menu } = require('electron');

let jsonServerProcess;

function setupJsonServer(json) {
    let router;
    const PORT = 3000;
    const app = express();
    const middleware = jsonServer.defaults({
        logger: false,
    });

    if (json) {
        router = jsonServer.router(json);
    } else {
        router = jsonServer.router(`${path.join(__dirname)}/db.json`);
    }

    app.use(middleware);
    app.use('/', router);

    jsonServerProcess = http.createServer(app);
    enableDestroy(jsonServerProcess);
    jsonServerProcess.listen(PORT, () => {
        console.log(`Json Server listening on port ${PORT}`);
    });
}

function startServer(options) {
    const app = express();
    const PORT = 8080;

    setupJsonServer();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(appRootDir.get(), 'public')));

    app.use('/api/local', (req, res) => {
        fs.writeFile(
            `${path.join(__dirname)}/db.json`,
            JSON.parse(req.body.payload, undefined, 2),
            function(err) {
                if (err) {
                    res.sendStatus(500);
                }
                jsonServerProcess.destroy(() => setupJsonServer());
                res.sendStatus(200);
            }
        );
    });

    app.use('/api/remote', (req, res) => {
        request.get(req.body.payload, (error, response, body) => {
            if (error) {
                res.sendStatus(500);
                return;
            }

            try {
                const json = JSON.parse(body);
                jsonServerProcess.destroy(() => setupJsonServer(json));
                res.sendStatus(200);
            } catch (error) {
                res.sendStatus(500);
            }
        });
    });

    app.use('/api/external', (req, res) => {
        shell.openExternal(req.body.payload);
        res.sendStatus(200);
    });

    app.use('/api/menu', (req, res) => {
        const template = [
            {
                label: 'What is this?',
                click() {
                    shell.openExternal(
                        'https://github.com/mackness/JSON-Server-UI#get-json-server-ui'
                    );
                },
            },
            {
                label: 'Detach',
                click() {
                    options.mainWindow.close();
                    options.detachedWindow.show();
                    options.mainWindow = options.detachedWindow;
                },
            },
            {
                label: 'Exit',
                click() {
                    options.mainWindow.quit();
                },
            },
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
        menu.popup();
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    http.createServer(app).listen(PORT, () => {
        console.log(`App Server listening on port ${PORT}`);
    });
}

module.exports = startServer;
