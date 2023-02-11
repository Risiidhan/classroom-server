const express = require('express');
const mongoose = require('mongoose');
const allocSubjectModel = require('../models/allocate-subject')


module.exports.getAllocSubjects = async(req,res) =>{
    try {
        // const allocSub = await allocSubjectModel.find();
        // res.send(allocSub);

        const allocSub = await allocSubjectModel.aggregate([
            { $lookup:
                {
                  from: 'subjects',
                  localField: 'subjectID',
                  foreignField: '_id', 
                  as: 'subjectDetails'
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
                $unwind : '$subjectDetails',
              }
        ]);
        res.send(allocSub);

    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getSubjectByID = async(req,res)=>{
    try {
        const subject  = await allocSubjectModel.findById(req.params.id)
        res.send(subject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.addAllocSubject = async(req,res)=>{

    try {
        let classNameCheck = await allocSubjectModel.findOne({subjectID:req.body.subjectID})
        if(classNameCheck!=null){
        return res.status(400).send('Subject allocation already exists')
    } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }

    let newSubject = new allocSubjectModel({
        teacherID: req.body.teacherID,
        subjectID: req.body.subjectID,
    })

    try {
        const addedSubject  = await newSubject.save();
        res.send(addedSubject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.updateSubject = async(req,res)=>{
    try {
        const updateSubject  = await allocSubjectModel.updateOne(
            {_id:req.params.id},
            {$set:{
                subjectName: req.body.subjectName,
            }}
        );
        res.send(updateSubject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.deleteSubject = async(req,res)=>{
    try {
        const subject = await allocSubjectModel.findById(req.params.id)
        const removeSub = subject.remove();
        res.send(removeSub)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}