const router =require('express').Router();
 let User = require('./model/user.model');

 function fetchData(){
  
    const promise =new Promise((resolve,reject)=>{
        
    router.route('/:id').get((req,res)=>{
     User.findById(req.params.id)
     .then((u)=>  resolve(u))
     .catch((err) => reject(err))

     res.json('done');

    
 });

  });

return promise;
 }



 //
 console.log("application start");

 //big operations that take long execution time

 fetchData()
 .then(user=>console.log("user abc "+user))
 .catch(err=>console.log(err));

 console.log("appliction end");
 module.exports=router;