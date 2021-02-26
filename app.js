'use strict'

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoCRUD', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => {
    console.error('Problem connecting to MongoDB... ', err.message)
    process.exit(1)
})

const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/course', require('./routes/courses.js'))

const port = process.env.PORT || 3030
app.listen(port, () => console.log(`HTTP server listening on port ${port}`))