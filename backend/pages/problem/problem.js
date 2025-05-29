const express=require('express')
const router = express.Router();
const {problem} = require("../../model/askModel");
const auth =require('../../middleware/auth');

router.post('/ask',auth,async (req,res)=>{
    try {
        const {title,question,answer,platform,ispublic}=req.body
        if(!(title && question)){
            return res.status(400).send("All input is required");
        }
        const newproblem = new problem({
            title:title,
            question:question,answer:answer,platfrom:platform,ispublic:ispublic
        })
        newproblem.save();
        console.log("problem added successfully",newproblem);
        return res.status(200).send("Your Problem uploaded successfully");
    } catch (error) {
        console.log("error in ask problem")
        console.error(error);
        return res.status(400).send("something went wrong, please try again later");
    }
});

module.exports= router;
