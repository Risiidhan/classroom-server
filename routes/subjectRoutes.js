const express = require('express');
const subject = require('../controllers/subjectController');
const router = express.Router();

router.get('/',subject.getSubject)
router.post('/',subject.addSubject)
router.patch('/:id',subject.updateSubject)
router.delete('/:id',subject.deleteSubject)
router.get('/:id',subject.getSubjectByID)
router.get('/me',subject.getSubjectName)


module.exports=router;