const mongoose = require ('mongoose')

//definir un modelo solo para mongo

const bootcampSchema = new mongoose.Schema({

    name : {
        type : String,
        unique : true,
        required : [true, 'Se requiere nombre del bootcamp'],
        maxlength : [100, 'El nombre del bootcamp es de 20 caracteres como maximo']
    },

    phone : {
        type : Number,
        required : [true, 'Telefono requerido'],
        maxlength : [9999999999, 'El telefono del bootcamp es de 10 caracteres como maximo']
    },

    address : {
        type : String,
        required : [true, 'Direccion requerida'],
    },

    topics : {
        type : [String],
        require : [true, 'Campo en el que se desempeña'],
        enum : [ 'AI', 'Backend', 'Frontend', 'Devops']
    },

    averageRating : Number,
    createdat : {
        type: Date,
        required: [true, 'Debe ingresarse fecha de creacion'],
        default : Date.now
    }

})

const Bootcamp = mongoose.model ('bootcamp', bootcampSchema)
module.exports = Bootcamp