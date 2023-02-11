var mongoose = require('mongoose');

module.exports = mongoose.model('classroom', {
   classroomName : {type : String, required:true}
});

