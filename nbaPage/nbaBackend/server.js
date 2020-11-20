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
    app.get('/conference/east', (req, res) => {
        const cursor = db.collection('team').find({conference:"East"}).sort({wins:-1,defeat:1,division:-1}).toArray()
        .then(results =>{
            res.send(results)
        })
        .catch(error=>console.error(error))
    })
    app.get('/conference/west', (req, res) => {
        const cursor = db.collection('team').find({conference:"West"}).sort({wins:-1,defeat:1,division:-1}).toArray()
        .then(results =>{
            res.send(results)
        })
        .catch(error=>console.error(error))
    })
}).catch(error=>console.error(error))
//listen
app.listen(port, () => console.log(`listening on localhost:${port}`))