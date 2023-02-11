const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()


mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URL,(err)=>{
    if(!err){
        console.log('database connected');
    }
})