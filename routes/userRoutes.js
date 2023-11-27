const express = require ('express')
const router = express.Router()
const mongoose = require ('mongoose')
const usuario_modelo = require ('../models/userModel')

//URI del cursos

router.get('/', async (req, res) => {
    
    try{

        const usuario = await usuario_modelo.find()

        if (usuario.length === 0) {

            res.status(400).json({
                success:false,
                msg: 'no hay usuarios'
            })

        }else{
            res.status(200).json({
                success:true,
                data : usuario
            })
        }

    }catch (error){
        res.status(500).json({
            success: false,
            msg:`error interno del sevidor ${error.message}`
        })
    }
})

router.get('/:id', async (req, res) => {
    
    try{
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            
            res.status(400).json({
                success: false,
                msg: `id invalido`
            })

        }else{
            
            const usuario = await usuario_modelo.findById(req.params.id)

            if (!usuario) {
                
                res.status(400).json({
                    success: false,
                    msg: `no existe el usuario ${req.params.id}`
                })
            }else{

                res.status(200).json({
                    success: true,
                    data: usuario
                })
            }

        }

    }catch (error){

        res.status(500).json({
            success: false,
            msg:`error interno del sevidor ${error.message}`
        })

    }

})

router.post('/registro', async (req, res) =>{
    
    try{

        const new_usuario = await usuario_modelo.create(req.body)

        res.status(201).json({

            success:true,
            data : new_usuario
            
            })

    }catch (error){
        
        res.status(500).json({

            success: false,
            msg:`${error.message}`
            
        })

    }
})

router.post('/login', async (req, res) =>{
    
    try{

        const {email, password} = req.body

        const usuario = await usuario_modelo.findOne({email})

        if (!usuario) {

            res.status(404).json ({

                success : false,
                message : "usuario no encontrado"

            })
            
        } else {

            const coincidencia = await usuario.compararPassword(password)

            if (coincidencia) {

                res.status(200).json ({

                    succes : true,
                    mensaje : "usuario logeado bn"

                })
                
            } else {

                res.status(401).json ({

                    succes : false,
                    mensaje : "credenciales invalidas"

                })
                
            }
            
        }

    }catch (error){
        
        res.status(500).json({

            success: false,
            msg:`${error.message}`
            
        })

    }
})

router.put('/:id', async (req, res) => {
    
    try{

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                
            res.status(400).json({
                success: false,
                msg: `id invalido`
            })

        }else{
            
            const usuario = await usuario_modelo.findByIdAndUpdate(req.params.id, req.body, {new: true})

            if (!usuario) {
                res.status(400).json({
                    success: false,
                    msg: `no existe el usuario con el id ${req.params.id}`
                })
            }else{

                res.status(200).json ({

                    exito : true,
                    datos : usuario

                })

            }
        }

    }catch (error) {
        res.status(500),json({
            success:true,
            msg: `error en el servidor ${error.message}`
        })
    }

})

router.delete('/:id', async (req, res) => {
    
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                
            res.status(400).json({
                success: false,
                msg: `id invalido`
            })
        }else{
            
            const usuario = await usuario_modelo.findByIdAndDelete(req.params.id)

            if (!usuario) {
                res.status(400).json({
                    success: false,
                    msg: `no existe el usuario con el id ${req.params.id}`
                })
            }else{

                res.status(200).json ({

                    exito : true,
                    datos : usuario

                })

            }
        }

    }catch (error) {
        res.status(500),json({
            success:true,
            msg: `error en el servidor ${error.message}`
        })
    }
})

module.exports = router