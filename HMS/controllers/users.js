const express = require ('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const { createToken } = require("../User/jwtConfig");


const Users = require ('../models/User');

router.get ('/',async(req,res)=>{
   try {
     await Users.find({}).then((savedUser) => {
         // console.log(savedUser);
         res.status(200).send(savedUser);
         });
   } catch (error) {
      res.status(404).send(error)
   }
      

    });

    router.get('/:fullName',async(req,res)=>{
      try {
        await Users.findOne({fullName:req.params.fullName}).then((saved) => {
            // console.log(savedUser);
            res.status(200).send(saved);
            });
      } catch (error) {
         res.status(404).send('user not found')
      }
         
   
       });

       router.post("/register", async (req, res) => {
        
         const { fullName,email, password, passwordConfirmation } = req.body;
        
           //Check password match before creating user
       if (passwordConfirmation == password) {

            // if (!passwordConfirmation == password) {
            //  return res.status(404).json({ message: "password does not match" });
            //  }
             //find if the user already exist
      Users.findOne({ email: email })
      .then((user) => {
                 //if user exists
                 if (user) {
                   return res.status(400).json("Email already exist");
                 } else {
                   //create a new user
                   const userDto = new Users({
                     fullName,
                     email,
                     password,
                     role: "user",
                    })//.catch(res.status(200).send({message:"Document created sucessfully"}))
                   //set password salt strength to 12
                   bcrypt.genSalt(12, (err, salt) => {
                     if (err) throw err;
                     //hash the user password
                     bcrypt.hash(userDto.password, salt, (err, hash) => {
                       if (err) throw err;
                       userDto.password = hash;
                       //save user
                    userDto.save().then((savedUser) => {
                           const token = createToken(savedUser);
                           const decodedToken = jwtDecode(token);
                           const expiresAt = decodedToken.exp;
                           const {fullName,email, role } = savedUser;
                           const userInfo = {
                             fullName,
                             email,
                             role,
                           };
                           return res.json({
                             message: "User created!",
                             token,
                             userInfo,
                             expiresAt,
                           });
                         })
                         .catch((err) => {
                           console.log(err);
                           return res.status(200).json({
                             message: "Document created sucessfully",
                           });
                         });
                     });
                   });
                 }
               })
               .catch((err) => {
                 console.log(err);
                 res.status(404).json({ message: "There was a problem creating your account" });
               });
           }
         }
       );


   router.put('/:id',async(req,res)=>{
      const {fullName,email,password} = req.body
      try {
        await Users.findByIdAndUpdate({_id:req.params.id},{fullName,email,password}).then((saved) => {
            // console.log(savedUser);
        res.status(200).send(saved);
            });
      } catch (error) {
         res.status(404).send('user not found')
      }
         
   
       });

       router.delete('/:id',async(req,res)=>{
         try {
           await Users.findByIdAndDelete({_id:req.params.id}).then((saved) => {
             res.status(200).send(saved);
               });
         } catch (error) {
            res.status(404).send('An error occured please try again')
         }
      });
   

   


module.exports=router;




  