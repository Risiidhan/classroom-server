const express = require('express');
const allocSubject = require('../controllers/allocSubjectController');
const router = express.Router();

router.get('/',allocSubject.getAllocSubjects)
router.post('/',allocSubject.addAllocSubject)
router.delete('/:id',allocSubject.deleteSubject)


module.exports=router;