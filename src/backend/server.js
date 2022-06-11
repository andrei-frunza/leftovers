const {MongoClient} = require('mongodb');
var express = require('express');
var app = express();
var http = require('http');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CORS
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Get all the recipes in the database
app.get('/database/', async function(req,res){
    const recipes = [];
    try{
        await client.connect();

        //Establish and verify the connection
        await client.db('testDB').command({ping:1});
        console.log('Accessing the whole database');

        //Doing the stuff now
        const collection=client.db("testDB").collection("food");
        const results = await collection.find();
        await results.forEach(data=>{
         //   console.log(data);
            recipes.push(data);
        });
        
        res.send(recipes)
    } finally {
        await client.close();
    }

});

//accepting custom JSON object
app.post('/create', async function(req,res){
    try{
        console.log(req.body)
        await client.connect();

        const collection=client.db("testDB").collection("food");
        await collection.insertOne(req.body);
        
    } finally {
        await client.close();
    }
});

var server = http.createServer(app);

server.listen(3000);


