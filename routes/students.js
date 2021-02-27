const debug = require('debug')('mongoCRUD2:studentsRouter')
const sanitizeBody = require('../middleware/sanitizeBody')
const Student = require('../models/Student')
const express = require('express')
const CourseModel = require('../models/Course')
const router = express.Router()

router.get('/', async (req, res) => {
    const students = await Student.find()
    res.send({data: students})
})

router.post('/', sanitizeBody, async (req, res) => {
    try {
        const newStudent = new Student(req.sanitizedBody)
        await newStudent.save()
        res.send({data: newStudent})
    } catch(err) {
        debug(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if(!student) throw new Error('resource not found')
        res.send({data: student})
    } catch(err) {
        sendResourceNotFound(res, req)
    }
})

router.patch('/:id', sanitizeBody, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                runValidators: true
            }
        )
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

router.put('/:id', sanitizeBody, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                overwrite: true,
                runValidators: true
            }
        )
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch(err) {
        sendResourceNotFound(req, res)
    }
})

router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    if(!student) throw new Error('Resource not found')
    res.send({data: student})
})


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