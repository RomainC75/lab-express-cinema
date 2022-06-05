const express = require('express')
const router = express.Router()

const Movie = require('../models/Movie.model')

/* GET /

This is a health check. It allows us to see that the API is running.
*/
router.get('/', async (req, res, next) =>{
  //res.json({ success: true, name: 'lab-express-cinema' })
  try{
    const ans = await Movie.find().select({'title':1,'director':1,'image':1})
    res.status(200).json(ans)
  }catch(e){
    next(e)
  }
})

router.get('/:id', async (req,res,next) =>{
  try{
    setTimeout( async()=>{
      const id=req.params.id
      const ans = await Movie.find({_id:id}).select({'__v':0})
      res.status(200).json(ans)
    },2000)
  }catch(e){
    next(e)
  }
})

router.post('/', async (req,res,next) =>{
  try{
    console.log('-->body',req.body)
    const ans = await Movie.create(req.body)
    res.status(200).json(ans)
  }catch(e){
    next(e)
  }
})

router.delete('/:id', async (req,res,next) =>{
  try{
    
    const ans = await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json(ans)
  }catch(e){
    next(e)
  }
})

module.exports = router
