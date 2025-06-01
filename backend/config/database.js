const mongoose=require('mongoose')
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