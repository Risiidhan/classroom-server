
const mongoose = require('mongoose');

let subjectSchema = new mongoose.Schema({
   subjectName: {type:String, required:true}
})

const subject = mongoose.model('subject',subjectSchema)

module.exports = subject;