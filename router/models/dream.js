const mongoose= require("mongoose");

const dreamSchema=new mongoose.Schema({
    latitude:{
        type:String,
        require:true
    },
    longitude:{
        type:String,
        require:true
    },
    device:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model("Dream",dreamSchema);