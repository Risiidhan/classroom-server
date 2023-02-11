var mongoose = require('mongoose');

module.exports = mongoose.model('allocate-classroom', {
   teacherID : {type : mongoose.Schema.Types.ObjectId, required:true},
   classroomID : {type : mongoose.Schema.Types.ObjectId, required:true}
});

