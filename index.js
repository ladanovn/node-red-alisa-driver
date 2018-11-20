module.exports = function (RED) {

    function AlisaDriverNode(config) {
        process.env.ALISA_CONFIG = JSON.stringify(config);
        RED.nodes.createNode(this, config);

        const {
            app,
            server
        } = require('./src/app');

        const node = this;
        const nodeContext = node.context();

        server.close();
        server.listen(config.port);
    }

    RED.nodes.registerType("Alisa-driver", AlisaDriverNode);
}