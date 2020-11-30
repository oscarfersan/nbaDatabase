const express = require('express')
const app = express()
const body_parser = require('body-parser')
const mongoose = require('mongoose')
app.use(body_parser.json())
const port = process.env.PORT || 6060
const mongoURI = 'mongodb+srv://oscarfersan:POKEMON99@nbadb.cp5yj.mongodb.net/nba?retryWrites=true&w=majority'
require('./Team')
require('./Player')
//listen
const Team = mongoose.model("team");
const Player = mongoose.model("player");
//app.use(express.json)
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Success!")
})
app.get('/',(req,res)=>{
    Team.find({}).sort({wins:-1,defeat:1}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.error(err)
    })
})
app.get('/draft',(req,res)=>{
    Player.find({draft_year:"2020"}).sort({draft_number:-1}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.error(err)
    })
})
app.listen(port, () => {console.log(`listening on localhost:${port}`)
})