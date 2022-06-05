const express = require('express')
const router = express.Router()

const Movie = require('../models/Movie.model')

/* GET /

This is a health check. It allows us to see that the API is running.
*/
router.get('/', async(req, res, next) =>{
  //res.json({ success: true, name: 'lab-express-cinema' })
  try{
    const ans = await Movie.find().select({'title':1,'director':1})
    res.status(200).json(ans)
  }catch(e){
    next(e)
  }
})

router.get('/:id', async (req,res,next) =>{
  try{
    const id=req.params.id
    const ans = await Movie.find({_id:id}).select({'__v':0})
    res.status(200).json(ans)
  }catch(e){
    next(e)
  }
})

module.exports = router
