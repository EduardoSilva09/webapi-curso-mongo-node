function getIndex(req, res, next) {
    res.status(200).send({ Api: "Node Api", version: "1.0.0" })
}

module.exports = { getIndex }