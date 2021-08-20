const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:{
        type:'String', 
        minLength:3,
        trim:true,
    },

    email:{
        type:'String',
        require:true,

    },

    password:{
        type:'String',
        require:true,
        
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

const User = mongoose.model('User',UserSchema);

module.exports=User