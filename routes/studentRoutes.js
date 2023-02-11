const express = require('express');
const student = require('../controllers/studentController');
const router = express.Router();

router.get('/',student.getStudents)
router.post('/',student.addStudent)
router.patch('/:id',student.updateStudent)
router.delete('/:id',student.deleteStudent)
router.get('/:id',student.getStudentById)


module.exports=router;