import bodyParser, { json } from "body-parser";
import express from "express";
import jsonwebtoken  from 'jsonwebtoken';
const jwt = jsonwebtoken;
var cors = require('cors');
const port =5000;
const app=express();
const mongoose= require('mongoose');
const refreshTokens =[];
// const Book= require('./book');
import {Book, User} from './book';


const dbURI=`mongodb://localhost/first`;
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((_result: any)=>console.log('Connected Successfully to DataBase'))
.catch((err: any)=>console.log(err));

// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Allow-Control-Allow-Methods", "GET,POST, DELETE, PUT");
//     res.header("Acess-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
//     next();
// })

app.use(cors());

app.use(bodyParser.json()); 

app.post("/register", (req, res) => {
    // const username = req.body.username;
    // const password = req.body.password;
    // const newuser = 
    const user = new User({
        username: req.body.username, 
        password : req.body.password
    });
    console.log(user);
    console.log(req.body);
    user.save();
    jwt.sign(user, 'pangong', {expiresIn : '1h'})
    res.send(user);
})


app.post("/login",(req:any, res:any) => {
    // console.log('going in');
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password)
    // const user = {username, password}
    User.findOne({username:username, password : password})
    .then((user:any) =>{
       const accessToken = jwt.sign({username : user.username}, 'pangnong', {expiresIn: '20m'});
       const refreshToken = jwt.sign({username : user.username}, 'pangnong');
       refreshTokens.push(refreshToken)
       console.log('user', user.username);
       res.json({accessToken, refreshToken, user})
   })
   .catch((err:Error) => {
       res.send('Error Occurend check username and password'+ err.name)
   })   

})

app.post('/logout', (req, res) => {
    const {token} = req.body;
    
    // refreshToken = refreshTokens.filter(token => t !== token)
    
})



app.get("/books",(_req,res)=>{
    // console.log('herer');
    Book.find()
    .then((result: any)=>{
        res.json(result.filter((ress:any) => ress.Mail === _req.body.Mail));
    })
    .catch((error: Error)=>console.log(error))
})

app.get("/bookDetails/:id",(req,res)=>{
    const id= req.params.id;
    console.log(id);
    Book.findById(id)
    .then((result: any)=>{
        res.send(result);
    })
    .catch((error: Error)=>console.log(error))
})


app.delete("/books/:id",(req,res)=>{
   const id= req.params.id;
    Book.deleteOne({_id:id})
    .then(()=>{
    res.status(200).json({
        message:'Books deleted'
    })
    })
    .catch((error:Error)=>console.log(error))
})


app.get('/books/price/:min/:max', (req, res) => {
    const min = req.params.min;
    const max = req.params.max;
    Book.find({$and:[{'price':{$gte:min}}, {'price': {$lte:max}}]})
    .then((result:any) => {
        console.log("here", result);
        res.send(result);
    })
    .catch((error:Error) => console.log(error))

})


app.post('/books',(req,res)=>{
    let book=new Book(req.body);
    book.save();
    res.send(book);
});

app.put('/books/:id',(req,res)=>{
    const book=new Book({
        _id:req.params.id,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        rating:req.body.rating,
    });
    Book.update({_id:req.params.id},book)
    .then(()=>{
        res.status(201).json({
            message:'Book updated successfully'
        })
    }).catch((error:Error)=>console.log(error))

})


function authenticationTokens(req:any, res:any, next:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, 'pangong', (err:any, user:any) => {
        if(err) return res.status(403).send('Something Went Wrong' + err.name)
        req.user = user
        next()
    })
}



app.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
});