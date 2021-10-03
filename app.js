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
app.get('/users',(req,res)=>{
    res.send(JSON.stringify(users));
})
app.listen(3000,function(){console.log(`server started`);});