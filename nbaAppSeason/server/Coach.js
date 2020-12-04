const mongoose = require('mongoose')

var CoachSchema = mongoose.Schema({
    _id: String,
    name:String,
    team:String,
    years_as_coach: Number,
    career:Array,
    thumbnail: String,
    rings:Number
})

mongoose.model('coach',CoachSchema,'coach');