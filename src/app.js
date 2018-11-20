const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const http = require("http");
const cors = require('cors')
const app = express();

app.use(cors())
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
            // console.log(req.body.request)
            const request = await axios.post(`http://${parser_host}:${parser_port}/`, {
                sender: {
                    type: 'Alisa'
                },
                source_text: req.body.request.command
            });

            res.json({
                version: req.body.version,
                session: req.body.session,
                response: {
                    text: request.data.handler.text,
                    end_session: false
                }
            });
            console.log(request.data);

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