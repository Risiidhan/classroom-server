const express = require('express');
const teacher = require('../controllers/teacherController');
const router = express.Router();

router.get('/',teacher.getTeachers)
router.post('/',teacher.addTeacher)
router.patch('/:id',teacher.updateTeacher)
router.delete('/:id',teacher.deleteTeacher)
router.get('/:id',teacher.getTeacherById)


module.exports=router;