const mongoose = require('mongoose')
 

const Schema = mongoose.Schema


const wardSchema=new Schema({
   firstname:{
       type:"String",
       unique:[true, "Firstname Already taken"],
       required:[true,"Please enter firstname"],
   },
   lastname:{
    type:"String",
    unique:[true, "Lastname Already taken"],
    required:[true,"Please enter lasttname"],
},
dateofbirth:{
    type:"String",
    unique:[true],
    required:[true,"Please choose a drug"],
},
ward:{
    type:"String",
    required:[true,"Please choose a ward"],
},
wardnumber:{
    type:Number,
    required:[true,"Please select ward number"]
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





const Ward = mongoose.model('ward' ,wardSchema)

module.exports=Ward


