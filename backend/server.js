const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const userRouter=require('./Router/user');
const promiseRouter=require('./promises');
const asyncAwaitRouter=require('./asyncAwait');

//create server object
const app =express();

//assign task to the server
app.use(cors());
app.use(express.json());
app.use('/user',userRouter);
app.use('/promises',promiseRouter);
app.use('/asyncAwait',asyncAwaitRouter);


// port setting 
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server is runnig on port:",port));

// Mongo database connectivity
const connectionString=process.env.ATLAS_URI;
 mongoose.connect(connectionString,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log( "Mongo db connection is established");
});