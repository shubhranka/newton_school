// const { items } = require("joi/lib/types/array");

const request = require("supertest");
const express   = require('express');
const app       = express();
const cors = require('cors');
const populateUsers = require("../populate")
const bodyParser= require('body-parser')
const routes = require('../routers')
app.use(bodyParser.json())
app.use(cors())
app.use("/",routes)

// const { server } = require("..");
// const app = require("../app/index")
const mongoose = require('mongoose')
const uri = process.env.mongouri;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let token;
let id;
let server

describe('auth token user 1',()=>{
    jest.setTimeout(30000);
    // beforeEach(()=>{
    //     if(server)
    //         server.close();
    //     server = require("../index");
    // })

    // afterEach(async()=>{
    //     await server.close()
    // })
    beforeAll(async()=>{
        server = await app.listen(4000,()=>{console.log("Server connected on 4000")})
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await populateUsers();
    })
    afterAll(async()=>{
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        await server.close()
        // await mongoose.connection.close();
        // await mongoose.disconnect()
    })
    it("should return the auth token for user 1",async()=>{
        token = await request(server).post("/auth").send({username:"testuser1",password:"test12345"});
        token = token.text
    })

    it('should return all posts list',async()=>{
        const posts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`)
        // console.log(posts.body)
        expect(posts.body.length).toBeGreaterThanOrEqual(1);
    })

    it('should create a new post with user 1',async()=>{
        const newPost = {
            title:"new POst",
            data:"new post data"
        }

        const np = await request(server).post("/post").set('x-access-token',`Bearer ${token}`).send(newPost)
        id = np.body["_id"]
        expect(np.body.postTitle).toBe(newPost.title)
        expect(np.body.postData).toBe(newPost.data)
    });
    it('should update the post by user 1',async()=>{
        const updatePost = {
            title : "New updated Post",
            data : "New updated data"
        }
        const updatedResult = await request(server).put(`/post/${id}`).set('x-access-token',`Bearer ${token}`).send(updatePost);
        expect(updatedResult.body.postTitle).toBe(updatePost.title);
        expect(updatedResult.body.postData).toBe(updatePost.data);
    })
    it('should delete the post by user 1',async()=>{
        await request(server).delete(`/post/${id}`).set('x-access-token',`Bearer ${token}`);
        let allPosts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`);
        allPosts = allPosts.body.filter(post => post["_id"] === id);
        expect(allPosts.length).toBe(0);
    })
})
describe('auth token user 2',()=>{
    jest.setTimeout(30000);
    // beforeEach(()=>{
    //     if(server)
    //         server.close();
    //     server = require("../index");
    // })

    // afterEach(async()=>{
    //     await server.close()
    // })
    beforeAll(async()=>{
        server = await app.listen(4000,()=>{console.log("Server connected on 4000")})
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connection.db.dropDatabase();
        await populateUsers();
    })
    afterAll(async()=>{
        await server.close()
        await mongoose.connection.close();
        // await mongoose.connection.close();
        // await mongoose.disconnect()
    })
    it("should return the auth token for user 1",async()=>{
        token = await request(server).post("/auth").send({username:"testuser2",password:"test12345"});
        token = token.text
    })

    it('should return all posts list',async()=>{
        const posts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`)
        // console.log(posts.body)
        expect(posts.body.length).toBeGreaterThanOrEqual(1);
    })

    it('should create a new post with user 1',async()=>{
        const newPost = {
            title:"new POst",
            data:"new post data"
        }

        const np = await request(server).post("/post").set('x-access-token',`Bearer ${token}`).send(newPost)
        id = np.body["_id"]
        expect(np.body.postTitle).toBe(newPost.title)
        expect(np.body.postData).toBe(newPost.data)
    });
    it('should update the post by user 1',async()=>{
        const updatePost = {
            title : "New updated Post",
            data : "New updated data"
        }
        const updatedResult = await request(server).put(`/post/${id}`).set('x-access-token',`Bearer ${token}`).send(updatePost);
        expect(updatedResult.body.postTitle).toBe(updatePost.title);
        expect(updatedResult.body.postData).toBe(updatePost.data);
    })
    it('should delete the post by user 1',async()=>{
        await request(server).delete(`/post/${id}`).set('x-access-token',`Bearer ${token}`);
        let allPosts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`);
        allPosts = allPosts.body.filter(post => post["_id"] === id);
        expect(allPosts.length).toBe(0);
    })
})
describe('auth token user 3',()=>{
    jest.setTimeout(30000);
    // beforeEach(()=>{
    //     if(server)
    //         server.close();
    //     server = require("../index");
    // })

    // afterEach(async()=>{
    //     await server.close()
    // })
    beforeAll(async()=>{
        server = await app.listen(4000,()=>{console.log("Server connected on 4000")})
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connection.db.dropDatabase();
        await populateUsers();
    })
    afterAll(async()=>{
        await server.close()
        await mongoose.connection.close();
        // await mongoose.connection.close();
        // await mongoose.disconnect()
    })
    it("should return the auth token for user 1",async()=>{
        token = await request(server).post("/auth").send({username:"testuser3",password:"test12345"});
        token = token.text
    })

    it('should return all posts list',async()=>{
        const posts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`)
        // console.log(posts.body)
        expect(posts.body.length).toBeGreaterThanOrEqual(1);
    })

    it('should create a new post with user 1',async()=>{
        const newPost = {
            title:"new POst",
            data:"new post data"
        }

        const np = await request(server).post("/post").set('x-access-token',`Bearer ${token}`).send(newPost)
        id = np.body["_id"]
        expect(np.body.postTitle).toBe(newPost.title)
        expect(np.body.postData).toBe(newPost.data)
    });
    it('should update the post by user 1',async()=>{
        const updatePost = {
            title : "New updated Post",
            data : "New updated data"
        }
        const updatedResult = await request(server).put(`/post/${id}`).set('x-access-token',`Bearer ${token}`).send(updatePost);
        expect(updatedResult.body.postTitle).toBe(updatePost.title);
        expect(updatedResult.body.postData).toBe(updatePost.data);
    })
    it('should delete the post by user 1',async()=>{
        await request(server).delete(`/post/${id}`).set('x-access-token',`Bearer ${token}`);
        let allPosts = await request(server).get("/posts").set('x-access-token',`Bearer ${token}`);
        allPosts = allPosts.body.filter(post => post["_id"] === id);
        expect(allPosts.length).toBe(0);
    })
})