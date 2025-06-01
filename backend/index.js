const express = require('express');
const app = express();
const {createServer}=require('http');
const {Server}=require('socket.io')
const cors=require('cors');
const port =process.env.PORT || 10000;
const connect = require('./config/database');
const auth=require('./middleware/auth');
//const userRouter=require('./routes/userRoute');
const roomRouter=require('./routes/roomRoute');
const homeRouter=require('./routes/homeRoute');
const msgRouter=require('./routes/msgRoute');
const signup = require('./pages/signup/signup');
const login = require('./pages/login/login');
const home = require('./pages/home/home');
const dotenv = require('dotenv');
const passport = require("passport");
const session = require('express-session');
const middleware=require('./middleware/auth');
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
    origin:['http://localhost:3000','https://zcoder-kappa.vercel.app'],
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE'],
}))
//app.use('/api/user',userRouter);
app.use('/api/room',roomRouter);
app.use('/api/home',homeRouter);
app.use('/api/problem',ask);
app.use('/api/msg',msgRouter);
// app.use(profile.app);
app.use(home.app);
// app.get('/status', verifyToken, (req, res) => {
//     const user = users.find(u => u.id === req.userId);
//     res.status(200).json({ authenticated: true, user });
//   });
app.use(login.app);
app.use(signup.app);
app.get('/api/getAuth',middleware,(req,res)=>{
    if(req.user){
        return res.status(200).json(req.user);
    }
    else{
        return res.status(400).send('You need to login first!')
    }
})
connect();


app.use(passport.initialize());
app.use(passport.session());
const server=createServer(app);
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    })
    
const io=new Server(server,{
    cors:{
        origin:['http://localhost:3000','https://zcoder-kappa.vercel.app'],
        credentials:true,
        methods:['GET', 'POST','PUT','DELETE'],
    }
})

io.on('connection',(socket)=>{
    //console.log(`${socket.id} connectd`);

    socket.on('joinRoom',(room)=>{
        //console.log(`${socket.id} has joined the room!`);
        socket.join(room);
        socket.to(room).emit('welcomeMsg',`${socket.id} has entered the chat`)
    })

    socket.on('newmessage',({msg,id})=>{
        //console.log(postmsg +`from ${socket.id}`);
        //console.log(msg);
        socket.to(id).emit('getmessage',msg);
    })
    socket.on('disconnect',()=>{
    })
})