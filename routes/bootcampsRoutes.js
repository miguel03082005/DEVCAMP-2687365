const express = require ('express')
const mongoose = require ('mongoose')
const bootcampModel = require ('../models/bootcampModel')
const Bootcamp = require('../models/bootcampModel')
const router = express.Router ()

//URI del bootcamp

router.get('/', async (req, res) => {

    try{

        const bootcamps = await bootcampModel.find()

        if (bootcamps.length === 0) {

            res.status(400).json({
                success:false,
                msg: 'no hay bootcamps'
            })

        }else{
            res.status(200).json({
                success:true,
                data : bootcamps
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
            
            const bootcamp = await bootcampModel.findById(req.params.id)

            if (!bootcamp) {
                
                res.status(400).json({
                    success: false,
                    msg: `no existe el bootcamp ${req.params.id}`
                })
            }else{

                res.status(200).json({
                    success: true,
                    data: bootcamp
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

router.post('/', async (req, res) => {

    try{

        const newBootcamp = await bootcampModel.create(req.body)

        res.status(201).json({

            success:true,
            data : newBootcamp
            
            })

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
            
            const bootcamp = await bootcampModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

            if (!bootcamp) {
                res.status(400).json({
                    success: false,
                    msg: `no existe el bootcamp con el id ${req.params.id}`
                })
                
            }else{

                res.status(200).json ({

                    exito : true,
                    datos : bootcamp

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
            
            const bootcamp = await bootcampModel.findByIdAndDelete(req.params.id)

            if (!bootcamp) {
                res.status(400).json({
                    success: false,
                    msg: `no existe el bootcamp con el id ${req.params.id}`
                })
            }else{

                res.status(200).json ({

                    exito : true,
                    datos : bootcamp

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