import express from "express";
import cors from 'cors';
import bookRouter from './routes/book.route.js'

const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/books',bookRouter)

app.get('/',(req,res)=>{
    res.send("Server is running")
})

export default app;