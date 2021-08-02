const express = require('express')
const router = express.Router();
const bcrypt    = require('bcrypt')
var jwt = require('jsonwebtoken');

const populateUsers = require("../populate")


// Schemas
const {postModel,userModel} = require("../models")



router.get('/populate',async(req,res)=>{
    await populateUsers()
    res.send("Populated");
})

router.get("/posts",middleWare,async (req,res)=>{
    // console.log(req.user);
    const posts = await postModel.find({});
    res.send(posts)
})

router.post("/post",middleWare,async(req,res)=>{
    try{
        const title = req.body.title;
        const data = req.body.data;
        const post = new postModel();
        post.postTitle = title;
        post.postData = data;
        post.postUser = req.user.username;
        const done = await post.save();
        res.send(done);
        // console.log(done);
    }catch(e){
        console.log(e)
        res.send("Invalid Data").status(400);
    }
})

router.delete("/post/:id",middleWare,async(req,res)=>{
    try{
        const id = req.params.id
        const post = await postModel.findOne({_id:id});
        if(!post){
            return res.send("No Post with the given ID");
        }
        // console.log(req.user,post.postUser)
        if(req.user.username !== post.postUser){
            return res.send("You cannot delete this post");
        }
        postModel.deleteOne({_id:id},(err)=>{
            if(err) return PromiseRejectionEvent();
        })
        return res.send("Post Deleted")
    }catch(e){
        console.log(e)
        res.send("Invalid Data")
    }
})
router.post("/auth",async(req,res)=>{
    // const user = 
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({username:username})

    // console.log(user)
    try{
        const matched = await bcrypt.compare(password,user.password);
    
        if(matched){
            const token = jwt.sign({username},process.env.jwtsecretkey)
            res.send(token)
            return;
        }else{
            return res.render('error')
        }

    }catch(e){
        return res.render('error')
    }
})

router.put("/post/:id",middleWare,async (req,res)=>{
    try{
        const id = req.params.id
        const post = await postModel.findOne({_id:id});
        if(!post){
            return res.send("No Post with the given ID");
        }
        // console.log(req.user,post.postUser)
        if(req.user.username !== post.postUser){
            return res.send("You cannot Update this post");
        }

        if(req.body.title == undefined && req.body.data == undefined )
            return res.status(401).send("Invalid Input")
        
        if(req.body.title)
            post.postTitle = req.body.title;
        if(req.body.data)
            post.postData = req.body.data;
        
        post.postDate = Date.now()
        await post.save((err,data)=>{
            res.status(200).send(data);
        })
    }catch(e){
        // console.log(e)
        res.send("Invalid Data")
    }
})

function middleWare(req,res,next){
    const header =req.headers["authorization"] || req.headers["x-access-token"]
    const token = header.split(" ")[1]
    jwt.verify(token,process.env.jwtsecretkey,(err,decoded)=>{
        if(err) return res.status(401).send("Invalid Token");
        
        req.user = decoded;
        next();
    })
}

module.exports = router