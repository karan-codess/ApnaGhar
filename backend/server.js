import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { connect } from 'http2';
import { connectDB } from './config/db.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userroutes.js';
import propertyRouter from './routes/propertyroutes.js';
import inquiryRouter from './routes/inquiryroutes.js';
import wishlistRouter from './routes/wishlistroutes.js';


const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/property",propertyRouter);
app.use("/api/inquiry",inquiryRouter);
app.use("/api/wishlist",wishlistRouter);


app.get('/', (req, res) => {
  res.send('api working');
});

const server=http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});