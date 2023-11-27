const mongoose = require('mongoose')
const colors = require ('colors')

// funcion de conexion

const conectarDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('mongoDB conectado.:'.bgBlack.bold.red)
}

module.exports = conectarDB