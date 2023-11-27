const express = require ('express')
const router = express.Router()
const mongoose = require ('mongoose')
const review_modelo = require ('../models/reviewModel')


//URI del cursos

router.get('/', async (req, res) => {

    try{

        const review = await review_modelo.find()

        if (review.length === 0) {

            res.status(400).json({

                success:false,
                msg: 'no hay reviews'

            })

        }else{

            res.status(200).json({
                success:true,
                data : review

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
            
            const review = await review_modelo.findById(req.params.id)

            if (!review) {
                
                res.status(400).json({

                    success: false,
                    msg: `no existe el review ${req.params.id}`

                })

            }else{

                res.status(200).json({
                    success: true,
                    data: review
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

        const new_review = await review_modelo.create(req.body)

        res.status(201).json({

            success:true,
            data : new_review
            
            })

    }catch (error){
        
        res.status(500).json({

            success: false,
            msg:`${error.message}`
            
        })

    }
})

router.put('/:id', async (req, res)  => {
    
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                
            res.status(400).json({
                success: false,
                msg: `id invalido`
            })

        }else{
            
            const review = await review_modelo.findByIdAndUpdate(req.params.id, req.body, {new: true})

            if (!review) {
                res.status(400).json({

                    success: false,
                    msg: `no existe el review con el id ${req.params.id}`

                })

            }else{

                res.status(200).json ({

                    exito : true,
                    datos : review

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
            
            const review = await review_modelo.findByIdAndDelete(req.params.id)

            if (!review) {

                res.status(400).json({
                    success: false,
                    msg: `no existe el review con el id ${req.params.id}`

                })
            }else{

                res.status(200).json ({

                    exito : true,
                    datos : review

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