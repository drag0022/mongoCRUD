//dependencies
const debug = require('debug')('mongoCRUD2:coursesRouter')
const sanitizeBody = require('../middleware/sanitizeBody')
const Course = require('../models/Course')
const express = require('express')
const router = express.Router()

//CRUD logic
router.get('/', async (req, res) => {
    const courses = await Course.find()
    res.send({data: courses})
})

router.post('/', sanitizeBody, async (req, res) => {
    try {
        const newCourse = new Course(req.sanitizedBody)
        debug({newCourse})
        await newCourse.save()
        res.send({data: newCourse})
    } catch(err) {
        debug(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        if(!course){
            throw new Error('resource not found') 
        }
        res.send({data: course})
    } catch(err) {
        sendResourceNotFound(req ,res)
    }
})

router.patch('/:id', sanitizeBody, async (req, res) => {
    try {
        
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                runValidators: true
            }
        )
        if (!course) throw new Error('Resource not found')
        res.send({data: course})
    } catch(err) {
        debug(err)
    }
})

router.put('/:id', sanitizeBody, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                overwrite: true,
                runValidators: true
            }
        )
        if (!course) throw new Error('Resource not found')
        res.send({data: car})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const course = await Course.findByIdAndRemove(req.params.id)
        if(!course) throw new Error('Resource not found')
        res.send({data: car})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

//error handling
function sendResourceNotFound(req, res){
    res.status(404).send({
        errors: [
            {
                status: '404',
                title: 'Resource does not exist',
                description: `We could not find a Course with id: ${req.params.id}`
            }
        ]
    })
}

module.exports = router