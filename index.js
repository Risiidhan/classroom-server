const connection = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const subjectRoute = require('./routes/subjectRoutes')
const studentRoute = require('./routes/studentRoutes')
const classroomRoute = require('./routes/classroomRoutes')
const teacherRoute = require('./routes/teacherRoutes')
const allocateSubjectRoute = require('./routes/allocSubjectRoutes')
const allocateClassroomRoute = require('./routes/allocClassroomRoutes')




const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5200, ()=>{
    console.log('server runnning');
})

app.use(express.json())

app.use('/student',studentRoute)
app.use('/classroom',classroomRoute)
app.use('/subject',subjectRoute)
app.use('/allocate-subject',allocateSubjectRoute)
app.use('/teacher',teacherRoute)
app.use('/allocate-classroom',allocateClassroomRoute)




