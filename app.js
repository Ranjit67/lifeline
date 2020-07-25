const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const path=require("path");

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("connected",()=>{
    console.log("The database is connected.");
})
mongoose.connection.on("err",()=>{
    console.log(err);
})
app.use(require("./router/route.js"))


app.get("/succes",(req,res)=>{
    res.send("Hello!! Ranjit");
})

if(process.env.PROD){
    app.use(express.static(__dirname +"./fronend/build"));


    app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,"./frontend/public"));
    })
    
}



app.listen(process.env.PORT || 5000,()=>{
    console.log("The port 5000 is redy to start..");
})



// Database link:- mongodb+srv://admin-keshab:<password>@cluster0-y5crp.mongodb.net/LifesDB?retryWrites=true&w=majority