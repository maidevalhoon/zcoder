const express=require('express')
const router = express.Router();
const {problem} = require("../../model/askModel");
const auth =require('../../middleware/auth');

router.post('/ask',auth,async (req,res)=>{
    try {
        const {title,question,answer,platform,ispublic,tag}=req.body
        if(!(title && question)){
            return res.status(400).send("All input is required");
        }
        const newproblem = new problem({
            user_id:req.user._id,
            name:req.user.name,
            title:title,
            question:question,answer:answer,platfrom:platform,ispublic:ispublic,
            tag:tag
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
const getProblemById=async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(200).send({
                success:false,
                message:"Problem not found",
            });
        }
        const user_id = req.user._id;
        const problems = await problem.findById(id);
        if(!problems||(user_id!=problems.user_id&&problems.ispublic===false)){
            return res.status(200).send({
                success:false,
                message:"Problem not found",
            });
        }
        return res.status(200).send({
            success:true,
            problems,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).send({
            success:false,
            message:"Something went wrong, please try again later",
        });
    }
}
router.get('/:id',auth,getProblemById);
module.exports= router;
