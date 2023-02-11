var mongoose = require('mongoose');

module.exports = mongoose.model('teacher', {
   firstName : {type : String, required:true},
   lastName : {type : String, required:true},
   contactNo : {type : Number, required:true},
   email : {type : String, required:true},

});
