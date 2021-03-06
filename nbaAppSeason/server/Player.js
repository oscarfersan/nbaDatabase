const mongoose = require('mongoose')

var PlayerSchema = mongoose.Schema({
    _id: String,
    name:String,
    weight:Number,
    heigh:Number,
    team:String,
    position:String,
    draft_year:String,
    draft_number:Number,
    university:String,
    salary:Number,
    thumbnail: String
})

mongoose.model('player',PlayerSchema,'player');