if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

try{
    mongoose.connect(process.env.uri)
}catch (err) {
    console.log(err)
}

//scheema
const dataSchema = new mongoose.Schema({
    data: String,
    _id: Number,
    name: String
})
const model = mongoose.model("data", dataSchema)

const db = mongoose.connection
db.on('error', err=>console.log(err))
db.once('open', ()=>{console.log('connected to database')})

app.get('/get', async (req, res)=>{
    const data = await model.find({});
    res.send(data)
})

app.post('/get', async (req, res)=>{
    const data = new model({
        data: req.body.data,
        _id: req.body.id,
        name: req.body.name
    })
    await data.save()

    res.send(data)
})

app.patch('/get/:id', async (req, res)=>{
    const data = await model.findByIdAndUpdate(req.params.id, req.body)
    await data.save()

    res.send(data)
})

app.delete('/get/:id', async (req, res)=>{
    const data = await model.findByIdAndDelete(req.params.id)

    res.send(data)
})
app.listen(3000, ()=>{
    console.log('listening in port 3000')
})