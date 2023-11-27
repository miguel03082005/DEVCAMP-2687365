const { default: mongoose } = require("mongoose");

//definir un modelo solo para mongo

const coursesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Se requiere el tituli del curso'],
        minlenth : [10, 'El titulo debe de ser minimo de 10 caracteres'],
        maxlenth : [30, 'El titulo debe de ser maximo de 30 caracteres']
    },

    description : {
        type : String,
        required : [true, 'Se requiere una descripcion'],
        minlenth : [true, 'La descripcion debe de ser minimo de 10 caracteres']
    },

    weeks : {
        type : Number,
        validate : {
            validator : Number.isInteger,
            message : 'El número de semanas debe ser un número entero'
        },
        required : [true, 'Se requiere el numero de semanas'],
        max : [9, 'El numero de semanas no puede ser mayor a 9']
    },

    enroll_cost : {
        type : Number,
        required : [true, 'Se requiere el valor de la inscripcion']
    },

    minimum_skill : {
        type : [String],
        required : [true, 'Nivel de avilidad requerido'],
        enum : ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    }

})

const Courses = mongoose.model ('courses', coursesSchema)
module.exports = Courses