const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const http = require("http");
const app = express();

const device = require('./commands/Device');
const light = require('./commands/Light');
const notFound = require('./commands/NotFound');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.post('/', async function (req, res) {

    if (req.body.request.command == "no text") {

        res.json({
            version: req.body.version,
            session: req.body.session,
            response: {
                text: "",
                end_session: false,
            },
        });

    } else if (req.body.request.command == "no version") {

        res.json({
            session: req.body.session,
            response: {
                text: req.body.request.command || 'Hello!',
                end_session: false,
            },
        });

    } else if (req.body.request.command == "no session") {

        res.json({
            version: req.body.version,
            response: {
                text: req.body.request.command || 'Hello!',
                end_session: false,
            },
        });

    } else if (req.body.request.command == "end session") {

        res.json({
            version: req.body.version,
            session: req.body.session,
            response: {
                text: req.body.request.command || 'Hello!',
                end_session: true,
            },
        });

    } else {

        const {
            parser_host,
            parser_port
        } = JSON.parse(process.env.ALISA_CONFIG);

        try {
            const request = await axios.post(`http://${parser_host}:${parser_port}/`, {
                sender: {
                    type: 'Alisa'
                },
                source_text: req.body.request.command
            });

            switch (request.data.parser.type) {
                case 0:
                    light(req, res, request.data);
                    break;
                case 1:
                    device(req, res, request.data);
                    break;
                case 2:
                    notFound(req, res, request.data);
                    break;
            }

        } catch (error) {
            res.json({
                version: req.body.version,
                session: req.body.session,
                response: {
                    text: 'Server error',
                    end_session: false
                }
            })
        }
    }
});

app.use('*', function (req, res) {
    res.sendStatus(404);
});

const server = http.createServer(app);

exports.app = app;
exports.server = server;