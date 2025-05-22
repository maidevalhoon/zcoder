const express = require('express');
const app = express();
const {createServer}=require('http');
const {Server}=require('socket.io')
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

const server=createServer(app);
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true,
        methods:['GET', 'POST','PUT','DELETE'],
    }
})

io.on('connection',(socket)=>{

    socket.on('joinRoom',(room)=>{
        socket.join(room);
        socket.to(room).emit('welcomeMsg',`${socket.id} has entered the chat`)
    })

    socket.on('newmessage',({postmsg,id})=>{
        
        socket.to(id).emit('getmessage',postmsg);
    })
    socket.on('disconnect',()=>{
    })
})