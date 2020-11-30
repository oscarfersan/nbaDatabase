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
    // const data = [
    //     {id:1, name:"Anthony Edwards", pos:"Es", team:"Minnesota Timberwolves", thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
    //     {id:2, name:"James Wiseman", pos:"P",team:"Golden State Warriors",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
    //     {id:3, name:"LaMelo Ball", pos:"BA",team:"Charlotte Hornets",thumbnail:"https://hoopshype.com/wp-content/uploads/sites/92/2019/11/i_a7_72_41_lamelo-ball.png"},
    //     {id:4, name:"Patrick Williams", pos:"ES",team:"Chicago Bulls",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4431687.png"}
    // ]
    // .then(()=>{
        res.send([
            {id:1, name:"Anthony Edwards", pos:"Es", team:"Minnesota Timberwolves", thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
            {id:2, name:"James Wiseman", pos:"P",team:"Golden State Warriors",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4594268.png"},
            {id:3, name:"LaMelo Ball", pos:"BA",team:"Charlotte Hornets",thumbnail:"https://hoopshype.com/wp-content/uploads/sites/92/2019/11/i_a7_72_41_lamelo-ball.png"},
            {id:4, name:"Patrick Williams", pos:"ES",team:"Chicago Bulls",thumbnail:"https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4431687.png"}
        ])
    // }).
    .catch(err=>{
        console.error(err)
    })
})
app.listen(port, () => {console.log(`listening on localhost:${port}`)
})