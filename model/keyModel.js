const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const FILE_PATH = path.join(__dirname, 'keys.json')

function findKeys() {
    if (!fs.existsSync(FILE_PATH)) return []

    const rawData = fs.readFileSync(FILE_PATH)
    const keys = JSON.parse(rawData)
    return keys
}

function findKey(key) {
    const keys = findKeys()
    return keys.find(k => k.key === key)
}

function createKey() {
    const keys = findKeys()
    const apiKey = {
        key: v4(),
        enabled: true,
        lastUsed: null
    }
    keys.push(apiKey)
    fs.writeFileSync(FILE_PATH, JSON.stringify(keys))
    return apiKey
}

function deleteKey(key) {
    const keys = findkeys()
    keys.forEach((item, indice, array) => {
        if (item.key === key) {
            array.splice(indice, 1)
        }
    });
    fs.writeFileSync(FILE_PATH, JSON.stringify(keys))
    return key
}

module.exports = {
    findKey,
    createKey,
    deleteKey
}
