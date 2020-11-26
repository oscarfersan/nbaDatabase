const express = require('express')
const app = express()
const body_parser = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 6060
const mongoURI = 'mongodb+srv://regular_user:IXQMdbUQX4SKTkAQ@nbadb.cp5yj.mongodb.net/nba?retryWrites=true&w=majority'
require('./Team')
//listen
const Team = mongoose.model("team");
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Success!")
})
app.get('/',(req,res)=>{
    Team.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.listen(port, () => console.log(`listening on localhost:${port}`))