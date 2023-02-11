const express = require('express');
const mongoose = require('mongoose');
const subjectModel = require('../models/subject')

module.exports.getSubject = async(req,res) =>{
    try {
        const subjects = await subjectModel.find();
        res.send(subjects);
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getSubjectByID = async(req,res)=>{
    try {
        const subject  = await subjectModel.findById(req.params.id)
        res.send(subject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getSubjectName = async(req,res)=>{
    try {
        const subject  = await subjectModel.find({_id: 0})
        res.send(subject)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.addSubject = async(req,res)=>{

    try {
        let classNameCheck = await subjectModel.findOne({subjectName:req.body.subjectName})
        if(classNameCheck!=null){
        return res.status(400).send('Subject already exists')
    } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }

    let newSubject = new subjectModel({
        subjectName: req.body.subjectName,
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
        let classNameCheck = await subjectModel.findOne({subjectName:req.body.subjectName})
        if(classNameCheck!=null){
        return res.status(400).send('Subject already exists')
    } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }
    
    try {
        const updateSubject  = await subjectModel.updateOne(
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
        const subject = await subjectModel.findById(req.params.id)
        const removeSub = await subject.remove();
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}