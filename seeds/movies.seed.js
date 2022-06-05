const data = require('../data/data')

const mongoose = require('mongoose')

const Movie = require('../models/Movie.model')

const dbConnect = require('../db/index')

const seed = async ()=>{
    try{
        await dbConnect()
        //await Movie.deleteMany()
        //console.log(data)
        const ans = await Movie.create(data)
        console.log(ans)
    }catch(e){
        console.log('error ! ',e)
    }
    mongoose.connection.close()
}

seed()

// ( async()=>{
//     try{
//         await dbConnect()
//         //await Movie.deleteMany()
//         console.log(data)
//         // const ans = await Movie.create(data)
//         // console.log(ans)
//     }catch(e){
//         console.log('error ! ',e)
//     }
//     mongoose.connection.close()
// } )