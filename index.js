const express = require('express');
const axios = require('axios');

module.exports = async function (RED) {

    function AlisaDriverNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

        const app = express();

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
                } = config;

                try {
                    const request = await axios.post(`http://${parser_host}:${parser_port}/`, {
                        sender: {
                            type: 'Alisa'
                        },
                        source_text: req.body.request.command
                    });
                    console.log(request)
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

        app.listen(config.port);
    }

    RED.nodes.registerType("Alisa-driver", AlisaDriverNode);
}