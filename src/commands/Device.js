module.exports = function (req, res, parser) {

    const devices = parser.handler.devices;
    let text;

    if (devices.length === 0) {
        text = 'У вас нет и одного девайса';
    } else {
        text = `У вас ${devices.length} устройств: \n`;
        devices.forEach(device => {
            text += `${device.name} \n`
        });
    }

    return res.json({
        version: req.body.version,
        session: req.body.session,
        response: {
            text: text,
            end_session: false
        }
    });
}