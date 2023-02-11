const express = require('express');
const mongoose = require('mongoose');
const teacherModel = require('../models/teacher')

module.exports.getTeachers = async(req,res)=>{
    try {
        const teacher = await teacherModel.find();
        res.send(teacher)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.addTeacher = async(req,res)=>{
    let newTeacher = new teacherModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNo: req.body.contactNo,
        email: req.body.email,
    })

    try {
        const addedTeacher = await newTeacher.save();
        res.send(addedTeacher);        
    } catch (error) {
        res.status(400).json({err:error.message})
    }

}

module.exports.deleteTeacher = async(req,res)=>{
    try {
        const teacher = await teacherModel.findById(req.params.id)
        const removeTeacher = teacher.remove();
        res.send(removeTeacher)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.getTeacherById = async(req,res)=>{
    try {
        const teacher = await teacherModel.findById(req.params.id)
        res.send(teacher)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports.updateTeacher = async(req,res)=>{
    try {
        const teacher = await teacherModel.updateOne(
            {_id:req.params.id},
            {$set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                contactNo: req.body.contactNo,
                email: req.body.email,
            }}
        )
        res.send(teacher)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}