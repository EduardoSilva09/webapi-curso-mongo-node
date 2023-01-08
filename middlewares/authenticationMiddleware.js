const keyModel = require('../model/keyModel')

module.exports = (req, res, next) => {
    const authorization = req.headers['authorization']
    const apiKey = keyModel.findKey(authorization.replace('ApiKey ', ''))
    if (apiKey && apiKey.enabled) {
        return next()
    } else
        res.sendStatus(401)// Não Autorizado
}