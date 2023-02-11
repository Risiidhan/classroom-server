const express = require('express');
const mongoose = require('mongoose');
const classModel = require('../models/classroom')

module.exports.getClassrooms = async(req,res) =>{
    try {
        const classes = await classModel.find();
        res.send(classes);
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getClassByID = async(req,res)=>{
    try {
        const classroom  = await classModel.findById(req.params.id)
        res.send(classroom)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.addClass = async(req,res)=>{

    try {
            let classNameCheck = await classModel.findOne({classroomName:req.body.classroomName})
            if(classNameCheck!=null){
            return res.status(400).send('className exists')
        } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }

    let newClass = new classModel({
        classroomName: req.body.classroomName,
    })

  
    try {
        const addedClass  = await newClass.save();
        res.send(addedClass)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.updateClass = async(req,res)=>{
    try {
        let classNameCheck = await classModel.findOne({classroomName:req.body.classroomName})
        if(classNameCheck!=null){
        return res.status(400).send('className exists')
    } 
    } catch (error) {
        res.status(400).json({err:error.message})
    }

    try {
        const updateClass  = await classModel.updateOne(
            {_id:req.params.id},
            {$set:{
                classroomName: req.body.classroomName,
            }}
        );
        res.send(updateClass)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.deleteClass = async(req,res)=>{
    try {
        const classroom = await classModel.findById(req.params.id)
        const removeClass = classroom.remove();
        res.send(removeClass)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}