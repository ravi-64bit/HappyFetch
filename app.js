//imports
const express=require('express');
const ejs=require('ejs');
const fetch=require('node-fetch');

//app
const app=express();
app.use(express.static('public'));
app.set('view engine','ejs');

//root
app.get("/",(req,res)=>{
    res.render('index',{name:'Raj Bihari'});
});


//joke API 1
app.get('/joke',async (req,res)=>{
    try{
        const response=await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
        const apidata=await response.json();
        const joke=apidata.joke;
        res.render('joke',{type:" ",joke:joke});
    }
    catch(exc){
        res.status(500).send('error 500');
    }
});

app.get("/darkjoke",async (req,res)=>{
    const response=await fetch("https://v2.jokeapi.dev/joke/Dark?type=single");
    const apidata=await response.json();
    res.render('joke',{type: "dark",joke:apidata.joke});
});

app.get("/progjoke",async (req,res)=>{
    const response=await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
    const apidata=await response.json();
    res.render('joke',{type:"programming",joke:apidata.joke});
});

//assigning a port
app.listen('30',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("server running at http://localhost:3000");
    }
});