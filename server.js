const express = require ('express')
const dotenv = require ('dotenv')
const colors = require ('colors')
const conectarDB = require ('./config/db')

//configurar variavles de entorno 

dotenv.config(
    {path: './config/.env'}
)

//dependencias de rutas 

const bootcampsRoutes = require('./routes/bootcampsRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')

conectarDB()

//construir el objeto app

const app = express()

app.use(express.json())

//vincular las rutas del proyecto

app.use('/bootcamps', bootcampsRoutes)
app.use('/courses', coursesRoutes)
app.use('/reviews', reviewRoutes)
app.use('/usuarios', userRoutes)

//prueva de url

app.get('/prueba' , function(req, res) {
    res.send('wenas')
})

//prueba de ruta parametrizada:

app.get('/prueba/:id' , function(req, res) {
    res.send(`parametro enviado: ${req.params.id}`)
})

//tomar variable puerto del entorno

const puerto = process.env.PUERTO

//servidor de desarrollo

app.listen(puerto , function () {
    console.log(`servidor ejecutando... ${puerto}`.bgBlack.bold.blue)
})