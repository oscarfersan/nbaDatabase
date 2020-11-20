//import 
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'Pusher'
import cors from 'cors'
import MongoClient from 'mongodb'
//app config
const app = express()
const port = process.env.PORT || 6060
//midd
app.use(cors())
app.use(express.json())
app.set('view engine','ejs')
//db config
const mongoURI = 'mongodb+srv://oscarfersan:QHZa5qJ532c2NSKg@nbadb.cp5yj.mongodb.net/nba?retryWrites=true&w=majority'
MongoClient.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected')
    const db = client.db('nba')
    const teamCollection = db.collection('team')
    app.get('/',(req,res)=>{
        res.render('index.ejs',{})
    })
    app.get('/conference', (req, res) => {
        const conf = req.query.conference
        const cursor = db.collection('team').find({conference:conf}).sort({wins:-1,defeat:1,division:-1}).toArray()
        .then(results =>{
            //res.send(results)
            res.render('conference.ejs',{teams:results})
        })
        .catch(error=>console.error(error))
    })
    app.get('/division', (req, res) => {
        const div = req.query.division
        const cursor = db.collection('team').find({division:div}).sort({wins:-1,defeat:1,division:-1}).toArray()
        .then(results =>{
            res.render('conference.ejs',{teams:results})
        })
        .catch(error=>console.error(error))
    })
}).catch(error=>console.error(error))
//listen
app.listen(port, () => console.log(`listening on localhost:${port}`))