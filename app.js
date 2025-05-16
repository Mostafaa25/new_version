import express from 'express';
const app = express()
app.use(express.json())
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})
import mongoose from 'mongoose'
import cors from 'cors'

const uri = process.env.MONGO_URL

mongoose.connect(uri).then(()=>{
    console.log('db connected')
})

app.use(cors())

const router = express.Router();


import * as userRoute from './auth/userAuth/route/userAuthRoute.js'
app.use('/auth',userRoute.default)

import * as coachRoute from './auth/coachAuth/Route/coachRoute.js'
app.use('/coach',coachRoute.default)

import * as workoutRoutes from './Workout/workoutRoutes.js'
app.use('/workouts', workoutRoutes.default);

import * as plans from './plan/planRoutes.js' 
app.use('/plans', plans.default);


app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening on port: ${process.env.PORT}`)
})