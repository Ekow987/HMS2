const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
	username:{
		type:String,
		required:true,
		minlength:3,
		trim:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		minlength:3,
		trim:true
	},
	password:{
		type:String,
		required:true,
		minlength:3,
		trim:true
	},
	role:{
		type:String,
		required:true,
		default:'user'
	},
  },
  {
  	timestamps:true
  }
);

UserSchema.set("toJSON",{
	transform:(document,returnObject)=>{
		returnObject.id = returnObject._id.toString();
		delete returnObject._id;
		delete returnObject._v
	}
})

const User=mongoose.model('User',UserSchema);
module.exports=User;