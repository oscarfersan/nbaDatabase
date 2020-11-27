const mongoose = require('mongoose')

var TeamSchema = mongoose.Schema({
    id: String,
    name:String,
    wins: Number,
    defeat: Number,
    conference: String,
    division: String,
    coach: String,
    thumbnail: String
})

mongoose.model('team',TeamSchema,'team');