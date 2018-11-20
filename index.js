module.exports = function (RED) {

    function AlisaDriverNode(config) {
        process.env.ALISA_CONFIG = JSON.stringify(config);
        RED.nodes.createNode(this, config);

        try {
            const {
                app,
                server
            } = require('./src/app');

            const node = this;
            const nodeContext = node.context();

            server.close();
            server.listen(config.port);

        } catch (error) {
            console.log(error)
        } finally {
            console.log('Я отработал')
        }

    }

    RED.nodes.registerType("Alisa-driver", AlisaDriverNode);
}