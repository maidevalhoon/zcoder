const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const user = require('../model/userModel');
const login=async(req,res)=>{
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
}

const signup=async (req,res)=>{
    try {
        const {name,email,password,techstack,favlang,rating} =req.body;
        if(!email || !name || !password){
           return res.status(400).send("All input is required");
        }
        const mailcheck=await user.findOne({email : email});
        if(mailcheck){
            return res.status(400).send("Email already exists");
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        const User={
            name,
            email,
            password:hashpassword,
            techstack,
            favlang,
            rating
        }
        const newUser=new user(User);
        await newUser.save();
        res.status(200).send("User registered successfully");
        //token generation
        const token=jwt.sign({_id:newUser._id},process.env.TOKEN_SECRET||"unknown",{
            expiresIn:'1d',
        });
    } catch (error) {
        console.log("something is wrong")
        console.log(error);
    }
}
module.exports={login,signup};