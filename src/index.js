const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Juan:juangamer@cluster0.8r0ivb0.mongodb.net/?retryWrites=true&w=majority')
app.use(express.json())

const Film = mongoose.model('Film', {
    name: String,
    description: String,
})


app.get('/', async(req,res) => {
    const allfilm = await Film.find()
    return res.send(allfilm)
})

app.post('/', async(req,res) => {
    const newfilm = new Film({
        name: req.body.name,
        description: req.body.description,
    })
    await newfilm.save()
    return res.send(newfilm)
})

app.delete('/:id', async(req,res) => {
    const delfilm = await Film.findByIdAndDelete(req.params.id)
    return res.send(delfilm)
})



app.listen(port, () => {
    console.log(`app acessado na port ${port}`)
})