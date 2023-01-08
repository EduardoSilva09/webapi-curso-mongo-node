const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');
const validationUserMiddleware = require('../middlewares/validationMidleware')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(userModel.findUsers())
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  res.json(userModel.findUser(id))
});

router.post('/', validationUserMiddleware, (req, res, next) => {
  const user = userModel.insertUser(req.body);
  res.status(201).json(user);
});

router.put('/:id', validationUserMiddleware, (req, res, next) => {
  const id = req.params.id
  const user = userModel.updateUser(id, req.body, true);
  res.status(200).json(user);
});

router.patch('/:id', validationUserMiddleware, (req, res, next) => {
  const id = req.params.id
  const user = userModel.updateUser(id, req.body, false);
  res.status(200).json(user);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  userModel.deleteUser(id);
  res.status(200);
});

module.exports = router;
