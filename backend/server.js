import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import { connect } from 'http2';
import { connectDB } from './config/db.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userroutes.js';
import propertyRouter from './routes/propertyroutes.js';
import inquiryRouter from './routes/inquiryroutes.js';
import wishlistRouter from './routes/wishlistroutes.js';
import contactRouter from './routes/contactroutes.js';
import adminRouter from './routes/adminroutes.js';
import chatRouter from './routes/chatroutes.js';



const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

const allowedOrigins=[
  "http://localhost:5173/",
].filter(Boolean)
app.use(cors({
  origin: function(origin,callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error("not allowed by CORS"))
    }
  },
  credentials:true
}));
app.use(express.json());


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/property",propertyRouter);
app.use("/api/inquiry",inquiryRouter);
app.use("/api/wishlist",wishlistRouter);
app.use("/api/contact",contactRouter)
app.use("/api/admin",adminRouter)
app.use("/api/chat",chatRouter)


app.get('/', (req, res) => {
  res.send('api working');
});

const server=http.createServer(app);


const io=new Server(server,{
  cors:{
origin:allowedOrigins,
methods:["GET","POST"]
  }
})

io.on("connection",(socket)=>{
  socket.on("joinChat",(chatId)=>{
    socket.join(chatId)
  })
  socket.on("sendMessage",(data)=>{
    io.to(data.chatId).emit("receiveMessage",data)
  })
  socket.on("disconnect",()=>{ })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});