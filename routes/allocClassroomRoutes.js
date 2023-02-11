const express = require('express');
const allocClassroom = require('../controllers/allocClassroomController');
const router = express.Router();

router.post('/',allocClassroom.addAllocClass)
router.delete('/:id',allocClassroom.deleteAllocClass)
router.get('/',allocClassroom.getAllocSubjects)


module.exports=router;