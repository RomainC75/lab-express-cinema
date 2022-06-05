const { SchemaTypes, model, Schema } = require('mongoose')

const MovieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    stars: [ String ],
    image: String,
    description: String,
    showtimes: [ String ]
})

const Movie = model('movie', MovieSchema)

module.exports = Movie