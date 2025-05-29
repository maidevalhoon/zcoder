const mongoose = require('mongoose');

const problemSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        max:255,
    },
    question:{
        type: String,
        required:true,
    },
    answer:{
        type: String,
    },
    platform:{
        type: String,
    },
    ispublic:{
        type: Boolean,
        default:false,
        required:true,
    }
})
const problem = mongoose.model("problem",problemSchema);
module.exports={problem};