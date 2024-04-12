require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Item = require('./models/Item')

const port = process.env.PORT || 4000

//Connect to MongoDB
mongoose.connect(`mongodb+srv://BenjaminGAThomas:${insertpasswordhere}@practicedb.a7xgvlc.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority&appName=PracticeDB`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

//Adding middleware

//enabling CORS
app.use(cors())

// serve static files
app.use(express.static('public'))

//Parse requests if it is urlencoded or if it is json
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Set EJS as templating engine
app.set('view engine','ejs')

//Routes
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/item', async(req,res) => {
    const items = await Item.find({})
    res.render('item', {items})
})

//Create
app.post('/item', async(req, res) => {
    const newItem = new Item(req.body)
    try {
        await newItem.save()
        res.redirect('/item')
    } catch (error) {
        res.redirect('/item?error=true')
    }
})

//Update
app.post('/item/update/:id', async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        await Item.findByIdAndUpdate(id, {name, description})
        res.redirect('/item')
    } catch (error) {
        res.redirect('/item?error=true')
    }
})

app.delete('/item/delete/:id', async(req, res) => {
    const {id} = req.params
    try {
        await Item.findByIdAndDelete(id, {name, description})
        res.status(200).jason({ message: 'Item deleted succesfully' });
        res.redirect('/item')
    } catch (error) {
        res.redirect('/item?error=true')
    }
})

//Starting the server
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})