const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const path = require("path")

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("connected",()=>{
    console.log("The database is connected.");
})

app.use(require("./router/route.js"))


if(process.env.NODE_ENV==='production'){
app.use(express.static('frontend/build'))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend' , 'build', 'index.html')); //related path
})

}




app.listen(process.env.PORT || 5000,()=>{
    console.log("The port 5000 is redy to start..");
})