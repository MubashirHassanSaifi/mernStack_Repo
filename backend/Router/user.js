const router=require('express').Router();
let User = require('../model/user.model');
const express= require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config();
 const app=express();
// get data from user collection/table
router.route('/:id').get((req,res)=>{
User.findById(req.params.id)
.then(user=>res.json(user))
.catch((err)=>res.status(400).json("Error!",err));
});

// add data to user table /collection

router.route('/add').post((req,res)=>{
     const username=req.body.username;
     const newUser= new User({username});
     newUser.save()
     .then(()=>res.json("user added"))
     .catch((err)=>res.status(400).json("!Error",err));

});

// delete data from user collection/table

router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json("user is deleted"))
    .catch((err)=>res.status(400).json("!Error",err));
});

//update the user by id 
 router.route('/update/:id').post((req,res)=>{
   User.findById(req.params.id)     //find the id which you want to update
   .then(                            // when you find the user
       user=>{
          user.username =req.body.username;
          user.save()
          .then(()=>res.json("user is updated"))
          .catch(err=>res.status(400).json('!Error' + err));
       }
   )
   .catch(err=>res.status(400).json('User not found !Error '+ err));

 });

//get user by token
 router.route('/post').post(authenticateToken,(req,res)=>{
   res.json();
 })


 //JWT
router.route('/login').post((req,res)=>{
  //authenticate user
  const user=req.body.username;
  const accessToken=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken:accessToken});
});
// verify token
function authenticateToken(req,res,next){
 const authHeader= req.headers['authorization'];
   const token  =authHeader && authHeader.split(' ')[1];
   if(token==null) return res.status(401);

   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
     if(err)  return res.status(403)
   req.user=user
   next();
    })
}
module.exports=router;