const mongoose = require ('mongoose')
const bcryptjs = require ('bcryptjs')

const modelo_usuario = new mongoose.Schema({

    nombres: {
        type : String,
        required : [true, 'el nombre es requerido'],
        maxlength : [30, 'El titulo debe de tener como maximo 30 caracteres'],
        minlength : [3, 'El titulo debe de tener como minimo 10 carasteres']
    },

    email: {
        type : String,
        require: [true, 'email requeridos']
    },

    password : {
        type : String,
        required : [true, 'documento requerido'],
        minlength: [8, 'El password debe ser mayor a 8']
    },

    role : String

})

modelo_usuario.pre('save', async function (next) {

    //generamos la sal para la encryptacion

    const salt = await bcryptjs.genSalt (10)

    // crear el campo ya con la sal

    this.password = await bcryptjs.hash (this.password, salt)
    
});

modelo_usuario.methods.compararPassword = async function (password) {

    return await bcryptjs.compare(password, this.password)
    
}

const usuario = mongoose.model ('usuario', modelo_usuario)
module.exports = usuario