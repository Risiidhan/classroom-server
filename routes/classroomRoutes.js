const express = require('express');
const classroom = require('../controllers/classroomController');
const router = express.Router();

router.get('/',classroom.getClassrooms)
router.post('/',classroom.addClass)
router.patch('/:id',classroom.updateClass)
router.delete('/:id',classroom.deleteClass)
router.get('/:id',classroom.getClassByID)


module.exports=router;