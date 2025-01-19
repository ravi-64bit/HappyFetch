//imports
const express=require('express');
const ejs=require('ejs');
const fetch=require('node-fetch');
const bodyp=require('body-parser');
const name=require('sillyname');
//const superhero=require('superheroes');

//app
const app=express();
app.use(express.static('public'));
app.set('view engine','ejs');

//list of APIs used
APIList=['joke','numbers'];


//root
app.get("/",(req,res)=>{
    res.render('index',{name:name()});
});


//joke API 1
app.get('/joke',async (req,res)=>{
    try{
        const response=await fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas?type=single");
        const apidata=await response.json();
        //const joke=apidata.joke;
        res.render('joke',{type:" ",joke:apidata.joke});
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

app.get("/dadjoke",async (req,res)=>{
    const response=await fetch("https://icanhazdadjoke.com/",{headers:{'Accept':'application/json'}});
    const dadjokejson=await response.json();
    res.render('joke',{type:'dad',joke:dadjokejson.joke});
});

//numbers api
app.get('/numbers',async (req,res)=>{
    var input=900;
    var url="https://numbersapi.com/random";
    const response=await fetch(url,{headers:{'Accept':'application/json'}});
    const numberfact=await response.json();
    res.send(numberfact);
});

app.use((req,res,next)=>{
    res.status(404).render('404');
});


//assigning a port
app.listen('3000',(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("server running at http://localhost:3000");
    }
});