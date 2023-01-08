const userModel = require('../model/userModel');

function getUsers(req, res, next) {
    res.json(userModel.findUsers())
}

function getUserById(req, res, next) {
    const id = req.params.id
    res.json(userModel.findUser(id))
}

function createUser(req, res, next) {
    const user = userModel.insertUser(req.body);
    res.status(201).json(user);
}

function updateUser(req, res, next) {
    const id = req.params.id
    const user = userModel.updateUser(id, req.body, true);
    res.status(200).json(user);
}

function patchUser(req, res, next) {
    const id = req.params.id
    const user = userModel.updateUser(id, req.body, false);
    res.status(200).json(user);
}

function deleteUser(req, res, next) {
    const id = req.params.id
    userModel.deleteUser(id);
    res.status(200);
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    patchUser
}