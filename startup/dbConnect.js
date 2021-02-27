const debug = require('debug')('mongoCRUD2:db')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoCRUD', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => debug('Connected to MongoDB...'))
.catch(err => {
    debug('Problem connecting to MongoDB... ', err.message)
    process.exit(1)
})