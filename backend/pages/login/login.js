const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const user = require('../../model/userModel');
dotenv=require('dotenv')
dotenv.config();
const express=require('express')
const app=express();

app.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        const User =await user.findOne({email:email});
        if(!User){
            console.error("User not exists");
            return res.status(400).send("User not exists")
        }
        const validPass=await bcrypt.compare(password,User.password);
        if(!validPass){
            console.error("Invalid Password");
            return res.status(400).send("Invalid Password")
        }
        const token=jwt.sign({_id:User._id},process.env.TOKEN_SECRET||"unknown",{
            expiresIn:'1d',
        });
        console.log(token);
        console.log(process.env.TOKEN_SECRET)
        console.log("User logged in successfully",User);
        return res.status(200).json(User);
    } catch (error) {
        console.error(error);
        return res.status(400).send("something went wrong, please try again later");
    }
})

exports.app=app;