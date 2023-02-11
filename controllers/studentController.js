const express = require('express');
const mongoose = require('mongoose');
const studentModel = require('../models/student')

module.exports.getStudents = async(req,res)=>{
    try {
        // const student = await studentModel.find();

        const student = await studentModel.aggregate([
            { $lookup:
                {
                  from: 'classrooms',
                  localField: 'classroomID',
                  foreignField: '_id', 
                  as: 'classroomDetails'
                }
              },
              {
                $unwind : '$classroomDetails',
              },
        ]);

        res.send(student)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}



module.exports.addStudent = async(req,res)=>{
    try {
        let classNameCheck = await studentModel.findOne({email:req.body.email})
        if(classNameCheck!=null){
        return res.status(400).send('Student with this email already exists')
    } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }

    let newStudent = new studentModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactPerson: req.body.contactPerson,
        contactNo: req.body.contactNo,
        email: req.body.email,
        dob: req.body.dob,
        age:req.body.age,
        classroomID: req.body.classroomID,
    })

    try {
        const addedStudent = await newStudent.save();
        res.send(addedStudent);        
    } catch (error) {
        res.status(400).json({err:error.message})
    }

}

module.exports.deleteStudent = async(req,res)=>{
    try {
        const student = await studentModel.findById(req.params.id)
        const removeStd = student.remove();
        res.send(removeStd)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getStudentById = async(req,res)=>{
    try {
        const studentArr = await studentModel.aggregate([
            { $match :
                 { _id : new mongoose.Types.ObjectId(req.params.id)} 
            },
            { $lookup:
                {
                  from: 'classrooms',
                  localField: 'classroomID',
                  foreignField: '_id', 
                  as: 'classroomDetails'
                }
              },
              {
                $unwind : '$classroomDetails',
            },

        ])
        const student = studentArr[0];
        res.send(student)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.updateStudent = async(req,res)=>{

    try {
        const student = await studentModel.updateOne(
            {_id:req.params.id},
            {$set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contactPerson: req.body.contactPerson,
                contactNo: req.body.contactNo,
                email: req.body.email,
                dob: req.body.dob,
                age:req.body.age,
                classroomID: req.body.classroomID,
            }}
        )
        res.send(student)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}