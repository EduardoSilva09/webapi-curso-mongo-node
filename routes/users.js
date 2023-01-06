const express = require('express');
const router = express.Router();
const db = require('../model/db');
const userScheema = require('../model/userScheema');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(db.findUsers())
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  res.json(db.findUser(id))
});

function validationUserMiddleware(req, res, next) {
  if (["POST", "PUT"].indexOf(req.method) !== (-1)) {
    if (!req.body.nome || !req.body.idade)
      return res.status(422).json({ error: "nome and idade are required!" })
  }
  const { error } = userScheema.validate(req.body)

  if (error)
    return res.status(422).json({ error: error.details })

  next()
}

router.post('/', validationUserMiddleware, (req, res, next) => {
  const user = db.insertUser(req.body);
  res.status(201).json(user);
});

router.put('/:id', validationUserMiddleware, (req, res, next) => {
  const id = req.params.id
  const user = db.updateUser(id, req.body, true);
  res.status(200).json(user);
});

router.patch('/:id', validationUserMiddleware, (req, res, next) => {
  const id = req.params.id
  const user = db.updateUser(id, req.body, false);
  res.status(200).json(user);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  db.deleteUser(id);
  res.status(200);
});

module.exports = router;
