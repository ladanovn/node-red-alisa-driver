module.exports = function (req, res, parser) {

    const {
        command,
        where
    } = parser.parser.data

    const lights = parser.handler.light;
    let text;

    text = command === 'включить' ? 'Включено ' : 'Выключено ';
    text += `${lights.length} осветительных приборов : \n`;

    lights.forEach(light => {
        text += `${light.name} \n`
    });


    return res.json({
        version: req.body.version,
        session: req.body.session,
        response: {
            text: text,
            end_session: false
        }
    });
}