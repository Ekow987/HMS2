 const mongoose = require('mongoose')
  const Schema = mongoose.Schema


 const opdSchema=new Schema({
    firstname:{
        type:"String",
        minlength:[3, "minimum lenth is 3"],
        required:[true,"Please enter your firstname"],
    },
     lastname:{
     type:"String",
     minlength:[3, "minimum lenth is 3"],
    required:true,
    },
    address:{
      type:"String",
       required:true,
     },
     age:{
         type:Number,
         required:true,
     },
     country:{
    type:"String",
     required:true,
   },

      city:{
         type:"String",
         required:true,
      },

     
      NHIS:{
        type:"String",
        required:true,
        },

     contact:{
        type:"String",
        minlength:[10, "minimum lenth is 10"],
        required:true,
     },
    
      cardprice:{
         type:Number,
         minlength:[2, "minimum lenth is 2"],
         required:true,
         },
      
      role:{
         type:'String',
         Default: 'user',
     },
      
    
 },
 {
   timestamp:true
  
}
 
 )

// // mongoose middleware



 const Opd = mongoose.model('opd' ,opdSchema)

 module.exports=Opd


