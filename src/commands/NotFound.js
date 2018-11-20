module.exports = function (req, res, parser) {
    return res.json({
        version: req.body.version,
        session: req.body.session,
        response: {
            text: 'К сожалению команда не распознана',
            end_session: false
        }
    });
}