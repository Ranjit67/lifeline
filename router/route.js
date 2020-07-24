const express=require("express");
const nodemailer= require("nodemailer");
const mongoose = require("mongoose");
const dream = require("./models/dream.js");
const route=express.Router();


 


route.post("/",(req,res)=>{
const {latitude,longitude,device,clintName,osName}=req.body;
if(latitude || longitude || device ){

   
    let transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.PASS
        }
    });

   let mailoption={
       from:"Ranjit sahoo",
       to:"ranjitsahoo873@gmail.com",
       subject:"Aisha file",
       text:"longitude is : "+ longitude +" "+ "latitude is : "+latitude+" and device name is : "+device+" Broweser name : "+clintName+ " os is : "+osName
   };
   transport.sendMail(mailoption)
   .then(data=>{
const Dream = new dream({
    latitude,
    longitude,
    device
});

Dream.save()
.then(result=>{
    res.json({reply:"The data is inserted in database and send in mail."});
})
.catch(err=>{
   res.json({reply:"The data is send in email but not inserted in database."})
})
    
   })




   .catch(err=>{
      
    const Dream = new dream({
        latitude,
        longitude,
        device
    });
    
    Dream.save()
    .then(result=>{
        res.json({reply:"The data is inserted in database but not send in mail."});
    })
    .catch(error=>{
       console.log(error);
    })

   })






 }
else{
    res.status(422).json({
        error:"The data not found."
    })
}
   
})




module.exports=route;







