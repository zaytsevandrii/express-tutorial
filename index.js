import express from 'express';
import mongoose from 'mongoose';
import { registerValidator } from './models/validations/auth.js';
import checkAuth from './utils/checkAuth.js'
import { register,login,getMe } from './controllers/UserController.js';

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://andrii:04071990@cluster0.bpsvecv.mongodb.net/users?retryWrites=true&w=majority').then(()=>{
    console.log('DB ok')
}).catch((err)=>console.log('DB',err))

const app=express()

app.use(express.json())

app.post('/auth/login', login)

app.get('/',(req,res)=>{
    res.send('Hello Client')
})

app.post('/auth/register',registerValidator,register)


app.get('/auth/me',checkAuth,getMe)

//Server Start
app.listen(4444,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('Server OK')
})