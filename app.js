const { RSA_PKCS1_OAEP_PADDING } = require("constants");
const exp = require("constants");
const express=require("express");
const path=require('path');
const app =express();

app.use('/',express.static(path.join(__dirname,'public','frontend')));
app.use('/',express.json());

const users=[];
app.get('/',function(req,res){
res.sendFile(path.join(__dirname,'public','frontend','index.html'));
})
app.post('/signup',(req,res)=>{
    users.push(req.body);
    res.end();
})
app.get('/login',(req,res)=>{
res.sendFile(path.join(__dirname,'public','frontend','log in.html'));
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','frontend','sign up.html'));
})
    
app.get('/users',(req,res)=>{
    res.send(JSON.stringify(users));
})

app.listen(3000,function(){console.log(`server started`);});