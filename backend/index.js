const express = require('express');
const app = express();
const cors=require('cors');
const port =5000;
const connect = require('./config/database');
const auth=require('./middleware/auth');
const userRouter=require('./routes/userRoute');
const roomRouter=require('./routes/roomRoute');
const homeRouter=require('./routes/homeRoute');

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE'],
}))
app.use('/api/user',userRouter);
app.use('/api/room',roomRouter);
app.use('/api/home',auth,homeRouter);
connect();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
