const router= require('express').Router();
let User = require('./model/user.model');


function fetchData(){
 const promise= new Promise((resolve,reject)=>{
 router.route('/:id').get((req,res)=>{
     User.findById(req.params.id)
     .then(user=>resolve(user))
     .catch(err=>reject(err));
     res.json("done");
 });
 });
return promise;
}

async function read(){
     
     const  promiseData  = await fetchData();
     console.log(promiseData);

}


console.log("async app start");
 read();
 console.log("async app is end");
 module.exports=router;




