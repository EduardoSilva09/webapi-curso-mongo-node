const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const FILE_PATH = path.join(__dirname, 'users.json')

function findUsers() {
    if (!fs.existsSync(FILE_PATH)) {
        return []
    }

    const rawData = fs.readFileSync(FILE_PATH)
    return JSON.parse(rawData)
}

function findUser(id) {
    return findUsers().find(item => item.id === id)
}

function insertUser(user) {
    const users = findUsers()
    user.id = v4()
    users.push(user)
    fs.writeFileSync(FILE_PATH, JSON.stringify(users))
    return user
}

function updateUser(id, user, overwrite) {
    const users = findUsers()
    const index = users.findIndex(item => item.id === id)

    if (index === (-1)) return {}

    if (overwrite) {
        users[index] = user
    } else {
        for (let key in user) {
            //Atualiza apenas as propriedades que vieram no JSON 
            users[index][key] = user[key]
        }
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(users))
    return users[index]
}

function deleteUser(id) {
    const users = findUsers()
    users.forEach((item, indice, array) => {
        if (item.id === id) {
            array.splice(indice, 1)
        }
    });
    fs.writeFileSync(FILE_PATH, JSON.stringify(users))
    return id
}

module.exports = {
    findUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser
}
