require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000

//Connect to MongoDB
mongoose.connect(`mongodb+srv://BenjaminGAThomas:@practicedb.a7xgvlc.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority&appName=PracticeDB`)
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

//LOGIC GOes HERE

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})