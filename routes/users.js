const express = require('express');
const router = express.Router();
const db = require('../model/db')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(db.findUsers())
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  res.json(db.findUser(id))
});

router.post('/', (req, res, next) => {
  const user = db.insertUser(req.body);
  res.status(201).json(user);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const user = db.updateUser(id, req.body, true);
  res.status(200).json(user);
});

router.patch('/:id', (req, res, next) => {
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
