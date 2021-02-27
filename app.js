'use strict'

const debug = require('debug')('mongoCRUD2:db')

require('./startup/dbConnect')
const sanitizeMongo = require('express-mongo-sanitize')
const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())
app.use('/api/course', require('./routes/courses.js'))
app.use('/api/student', require('./routes/students.js'))

const port = process.env.PORT || 3030
app.listen(port, () => debug(`HTTP server listening on port ${port}`))