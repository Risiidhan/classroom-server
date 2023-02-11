var mongoose = require('mongoose');

module.exports = mongoose.model('allocate-subject', {
   teacherID : {type : mongoose.Schema.Types.ObjectId, required:true},
   subjectID : {type : mongoose.Schema.Types.ObjectId, required:true}
});

