const mongoose = require ('mongoose')

const reviewSchema = new mongoose.Schema({

    title: {
        type : String,
        required : [true, 'Titulo de la reseña requerido'],
        maxlength : [30, 'El titulo debe de tener como maximo 30 caracteres'],
        minlength : [10, 'El titulo debe de tener como minimo 10 carasteres']
    },

    text: {
        type : String,
        require: [true, 'Descripcion de la reseña requerido'],
        minlength: [50, 'La descripcion debe de ser mayor a 10 caracteres']
    },

    rating: {
        type : Number,
        validate : {
            validator : Number.isInteger,
            message : 'El número de semanas debe ser un número entero'
        },
        required : [true, 'Calificacion requerida'],
        maxlength : [10, 'El numero de semanas no puede ser mayor a 10']
    },

    boodcamp_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp', // Reference to the Bootcamp model
        required: [true, 'Requerido el id del bootcamp']
    },

    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'Requerido el id del usuario']
    }

})

const review = mongoose.model ('review', reviewSchema)
module.exports = review