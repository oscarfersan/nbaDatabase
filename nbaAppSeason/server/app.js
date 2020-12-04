const express = require('express')
const app = express()
const body_parser = require('body-parser')
const mongoose = require('mongoose')
app.use(body_parser.json())
const port = process.env.PORT || 6060
const mongoURI = 'mongodb+srv://regular_user:1dXHEbrelbxl4kQf@nbadb.cp5yj.mongodb.net/nba?retryWrites=true&w=majority'
require('./Team')
require('./Player')
//listen
const Team = mongoose.model("team");
const Player = mongoose.model("player");

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Success!")
})
app.get('/conference',(req,res)=>{
    const cnf = req.query.conference
    Team.find({conference:cnf}).sort({wins:-1,defeat:1}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.error(err)
    })
})
app.get('/division',(req,res)=>{
    const cnf = req.query.division
    Team.find({division:cnf}).sort({wins:-1,defeat:1}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.error(err)
    })
})
app.get('/draft',(req,res)=>{
    const year = req.query.draft_year
    Player.find({draft_year:year}).sort({draft_number:1}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.error(err)
    })
})
app.listen(port, () => {console.log(`listening on localhost:${port}`)
})