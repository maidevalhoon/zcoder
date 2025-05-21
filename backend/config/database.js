const mongoose=require('mongoose')
const connect = async ()=>{
    try {
        console.log('Connecting to database')
        await mongoose.connect("mongodb+srv://shivam:RAYXKZa62aGb8NrP@tested.sccy7l7.mongodb.net/"
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