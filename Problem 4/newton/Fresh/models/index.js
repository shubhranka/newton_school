const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

const postSchema = new mongoose.Schema({
    postTitle:String,
    postUser:String,
    postData:String,
    postDate:{
        type:Date,
        default:Date.now
    }
})


const postModel = mongoose.model('Posts',postSchema)
const userModel = mongoose.model('Users',userSchema)

module.exports.postModel = postModel;
module.exports.userModel = userModel;