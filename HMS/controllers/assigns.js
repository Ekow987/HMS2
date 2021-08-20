const express = require ('express');
const router = express.Router();

const Users = require ('../models/Assign');

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

    router.get('/:doctorname',async(req,res)=>{
      try {
        await Users.findOne({doctorname:req.params.doctorname}).then((saved) => {
            // console.log(savedUser);
            res.status(200).send(saved);
            });
      } catch (error) {
         res.status(404).send('user not found')
      }
         
   
       });



router.post('/', async(req, res) => {
   try {
      const userDto = { ...req.body };
const newUser = new Users(userDto);
 await newUser.save().then((savedUser) => {
// console.log(savedUser);
res.status(200).send(savedUser)
}).catch(error =>{res.status(400).json({message:'user not saved',error:error})})
   } catch (error) {
      res.status(500).send("error")
   }

   });

   router.put('/:id',async(req,res)=>{
      const {doctorname,Position} = req.body
      try {
        await Users.findByIdAndUpdate({_id:req.params.id},{doctorname,Position}).then((saved) => {
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




  