const express = require('express');
const mongoose = require('mongoose');
const allocClassroomModel = require('../models/allocate-classroom')


module.exports.getAllocSubjects = async(req,res) =>{
    try {
        // const allocClass = await allocClassroomModel.find();
        // res.send(allocClass);

        const allocClass = await allocClassroomModel.aggregate([
            { $lookup:
                {
                  from: 'classrooms',
                  localField: 'classroomID',
                  foreignField: '_id', 
                  as: 'classroomDetails'
                }
              },
              { $lookup:
                {
                  from: 'teachers',
                  localField: 'teacherID',
                  foreignField: '_id', 
                  as: 'teacherDetails'
                }
              },
              {
                $unwind : '$teacherDetails',
              },
              {
                $unwind : '$classroomDetails',
              }
        ]);
        res.send(allocClass);



    } catch (error) {
        res.status(400).json({err:error.message})
    }
}


module.exports.addAllocClass = async(req,res)=>{

    let newSubject = new allocClassroomModel({
        teacherID: req.body.teacherID,
        classroomID: req.body.classroomID,
    })

    try {
        const addedSubject  = await newSubject.save();
        res.send(addedSubject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.deleteAllocClass = async(req,res)=>{
    try {
        const subject = await allocClassroomModel.findById(req.params.id)
        const removeSub = subject.remove();
        res.send(removeSub)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}