const express = require('express')
const {PostModel} = require("../models/Post.model")

const postRouter = express.Router()

postRouter.get("/", async(req, res) => {
    const userID = req.body.userID;
    try{
        const allPost = await PostModel.find({userID})
        res.send(allPost)

    }catch(err){
        res.send({"msg":"error in fetching", "err":err.message})
    }

})

postRouter.post("/create", async(req, res) => {
    const post = req.body;
    try{
        const newPost = await PostModel(post)
       await newPost.save()
       res.send({"msg":"Post Successfully"})

    }catch(err){
        res.send({"msg":"error in post", "err":err.message})
    }
})


postRouter.patch("/update/:id", async(req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    const userID = payload.userID;
    try{
        const findUser = await PostModel.find({_id:ID})
        if(findUser[0].userID === userID){
            await PostModel.findByIdAndUpdate({_id:ID}, payload);
            res.send({"msg":"Updated Successfully"});
        }else{
            res.send({"msg":"You are not Authorized"})
        }
       

    }catch(err){
        res.send({"msg":"error in Updating", "err":err.message})
    }
})

postRouter.delete("/delete/:id", async(req, res) => {
    const ID = req.params.id;
    
    const userID = payload.userID;
    try{
        const findUser = await PostModel.find({_id:ID})
        if(findUser[0].userID === userID){
            await PostModel.findByIdAndDelete(ID);
            res.send({"msg":"Deleted Successfully"});
        }else{
            res.send({"msg":"You are not Authorized"})
        }
       

    }catch(err){
        res.send({"msg":"error in Deleting", "err":err.message})
    }
})


module.exports={
    postRouter
}


