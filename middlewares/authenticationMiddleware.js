module.exports = (req, res, next) => {
    const authorization = req.headers['authorization']
    if (authorization === '123') {
        return next()
    } else
        res.sendStatus(401)// Não Autorizado
}