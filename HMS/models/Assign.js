const mongoose = require('mongoose')
 const Schema = mongoose.Schema


 
const assignSchema=new Schema({
   doctorname:{
       type:"String",
       unique:[true, "Doctor name Already taken"],
       required:[true,"Please enter Doctor name"],
   },
   Position:{
    type:"String",
    unique:[true, "Position Already taken"],
    required:[true,"Please enter Position"],
},

role:{
    type:'String',
    Default: 'user',
},
},
{
 timestamp:true

}
);

// // mongoose middleware


const Assign = mongoose.model('assign' ,assignSchema)

module.exports=Assign


