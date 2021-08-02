const express   = require('express');
const app       = express();
const cors = require('cors');
const mongoose = require('mongoose')
const uri = process.env.mongouri; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser= require('body-parser')
const routes = require('./routers')
app.use(bodyParser.json())
app.use(cors())
app.use("/",routes)

const server = app.listen(4000,()=>{
    console.log("Server started on server 4000");
})

module.exports = server;
