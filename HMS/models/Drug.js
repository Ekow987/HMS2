const mongoose = require('mongoose')
 

const Schema = mongoose.Schema


const drugSchema=new Schema({
   firstname:{
       type:"String",
       unique:[true, "Firstname Already taken"],
       required:[true,"Please enter firstname"],
   },
   lastname:{
    type:"String",
    unique:[true, "Lasttname Already taken"],
    required:[true,"Please enter lasttname"],
},
sickness:{
    type:"String",
    unique:[true, "Disease Already recorded"],
    required:[true,"Please choose a drug"],
},
prescribedrug:{
    type:"String",
    unique:[true, "Drug Already taken"],
    required:[true,"Please choose a drug"],
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



const Drug = mongoose.model('drug' ,drugSchema)

module.exports=Drug


