import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({path: "./backend/config.env"})
  
connectDB()

const app = express()
// console.log(process.env.PORT)
app.use(express.json())

app.get('/',(req,res)=>{
  res.send("Hello")
})

const PORT= process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
