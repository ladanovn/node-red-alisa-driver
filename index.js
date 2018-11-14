module.exports = async function (RED) {

    function AlisaDriverNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

    }

    RED.nodes.registerType("Alisa-driver", AlisaDriverNode);
}