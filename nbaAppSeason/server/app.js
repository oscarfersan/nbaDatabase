const express = require('express')
const app = express()
const body_parser = require('body-parser')
const mongoose = require('mongoose')
app.use(body_parser.json())
const port = process.env.PORT || 6060
const mongoURI = 'mongodb+srv://oscarfersan:POKEMON99@nbadb.cp5yj.mongodb.net/nba?retryWrites=true&w=majority'
require('./Team')
//listen
const Team = mongoose.model("team");
app.use(express.json)
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
        console.error(err)
    })
})
app.listen(6060, () => {console.log(`listening on localhost:${port}`)
})