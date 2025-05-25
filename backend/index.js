const express = require('express');
const app = express();
const {createServer}=require('http');
const {Server}=require('socket.io')
const cors=require('cors');
const port =5050;
const connect = require('./config/database');
const auth=require('./middleware/auth');
const userRouter=require('./routes/userRoute');
const roomRouter=require('./routes/roomRoute');
const homeRouter=require('./routes/homeRoute');
const signup = require('./pages/signup/signup');
const login = require('./pages/login/login');
const home = require('./pages/home/home');
const dotenv = require('dotenv');
const passport = require("passport");
const session = require('express-session');
dotenv.config();
const profile = require('./pages/profile/profile');
const ask = require('./pages/problem/problem')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE'],
}))
app.use('/api/user',userRouter);
app.use('/api/room',roomRouter);
app.use('/api/home',auth,homeRouter);
app.use('api/problem',ask);
app.use(profile.app);
app.use(home.app);
// app.get('/status', verifyToken, (req, res) => {
//     const user = users.find(u => u.id === req.userId);
//     res.status(200).json({ authenticated: true, user });
//   });
app.use(login.app);
app.use(signup.app);
connect();


app.use(passport.initialize());
app.use(passport.session());
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
    //console.log(`${socket.id} connectd`);

    socket.on('joinRoom',(room)=>{
       // console.log(`${socket.id} has joined the room!`);
        socket.join(room);
        socket.to(room).emit('welcomeMsg',`${socket.id} has entered the chat`)
    })

    socket.on('newmessage',({postmsg,id})=>{
        //console.log(postmsg +`from ${socket.id}`);
        socket.to(id).emit('getmessage',postmsg);
    })
    socket.on('disconnect',()=>{
    })
})