const userScheema = require("../model/userScheema")

module.exports = (req, res, next) => {
    if (["POST", "PUT"].indexOf(req.method) !== (-1)) {
        if (!req.body.nome || !req.body.idade)
            return res.status(422).json({ error: "nome and idade are required!" })
    }
    const { error } = userScheema.validate(req.body)

    if (error)
        return res.status(422).json({ error: error.details })

    next()
}