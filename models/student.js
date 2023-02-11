var mongoose = require('mongoose');

module.exports = mongoose.model('student', {
   firstName : {type : String, required:true},
   lastName : {type : String, required:true},
   contactPerson : {type : String, required:true},
   contactNo : {type : Number, required:true},
   email : {type : String, required:true},
   dob : {type : String, required:true},
   age : {type : Number, required:true},
   classroomID : {type : mongoose.Schema.Types.ObjectId, required:true},
});

