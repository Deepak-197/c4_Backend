const express = require('express')
const {UserModel} = require("../models/User.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("Register Page")
})

userRouter.post("/register", async(req, res) => {
    const {name, email, gender, password, age, city} = req.body;
    try{
        const findUser = await UserModel.find({email})
        if(findUser.length>0){
            bcrypt.hash(password, 5, async(err, hashpass) => {
                if(err){
                    res.send({"msg": err.message})
                }else{
                    let user = new UserModel({name, email, gender, password:hashpass, age, city})
                    await user.save();
                    res.send({"msg": "Successfully Registered"})
                }
            })
        }else{
            res.send({"msg":"user already exist"})
        }

    }catch(err){
        res.send({"msg": "Error in Registering", "err":err.message})
    }
})

userRouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const findUser = await UserModel.find({email})
        if(findUser.length>0){
            const hashpass = bcrypt.compare(password, findUser[0].password)
            if(hashpass){
                const token = jwt.sign({userID:findUser[0]._id}, "socialpracticetoken", {expiresIn: "1h"})
                res.send({"msg":"Login Successfull", "token": token})
            }else{
                res.send({"msg":"Wrong Credentials"})
            }
             
                
        }else{
            res.send({"msg":"Wrong Credentials"})
        }

    }catch(err){
        res.send({"msg": "Error in Login", "err":err.message})
    }
})


module.exports={
    userRouter
}