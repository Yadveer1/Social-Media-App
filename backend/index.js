import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';

const uri = process.env.MONGO_URL;


const app = express();

app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);


app.listen(5000, () => {
    console.log("App started!");
    mongoose.connect(uri);
    console.log("DB connected!");
});