const faker = require('faker');
const {userModel,postModel} = require("./models")
const bcrypt    = require('bcrypt')
async function populateUsers(){

    const users = ["testuser1","testuser2","testuser3"]

    let user = new userModel()
    user.username = "testuser1";
    let hash = await bcrypt.hash("test12345",10)
    user.password = hash;
    await user.save();
    user = new userModel()
    user.username = "testuser2";
    hash = await bcrypt.hash("test12345",10)
    user.password = hash;
    await user.save();
    user = new userModel()
    user.username = "testuser3";
    hash = await bcrypt.hash("test12345",10)
    user.password = hash;
    await user.save();

    // create 10 posts
    for(i=0; i<10; i++){
        const title = faker.name.title();
        const sentence = faker.lorem.sentence();
        const index = Math.round(Math.random()*2)

        const post = new postModel();
        post.postTitle = title;
        post.postData = sentence;
        post.postUser = users[index];
        
        await post.save();
    }
}

module.exports = populateUsers