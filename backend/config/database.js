const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to use the .env file in the backend folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const connect = async ()=>{
    try {
        console.log('Connecting to database')
        await mongoose.connect(process.env.MONGO_URI
        ).then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log('Database connection error');
            console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;