import express from 'express';
import mongoose from 'mongoose';
import { registerValidator,loginValidation, postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js'
import { register,login,getMe } from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import multer from 'multer';


mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://andrii:04071990@cluster0.bpsvecv.mongodb.net/users?retryWrites=true&w=majority').then(()=>{
    console.log('DB ok')
}).catch((err)=>console.log('DB',err))

const app=express()

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads')
    },
    filename:(_,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload = multer({storage})

app.use(express.json())

app.post('/auth/login', login)
app.post('/auth/register',registerValidator,register)
app.get('/auth/me',checkAuth,getMe)

app.post('/uploads',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`,
    })
})
app.use('/uploads',express.static('uploads'))

app.get('/posts',PostController.getAll)
app.get('/posts/:id',PostController.getOne)
app.post('/posts',checkAuth,postCreateValidation,PostController.create)
app.delete('/posts/:id',checkAuth,PostController.remove)
app.patch('/posts/:id',checkAuth,PostController.update)

//Server Start
app.listen(4444,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log('Server OK')
})