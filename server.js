const express = require("express");
const app = express();
const req = require("express/lib/request");
const ObjectId = require("mongodb").ObjectID;
const bodyParse= require("body-parser");
const path = require("path");
const { header } = require("express/lib/request");

function getClient(){
  const MongoClient = require("mongodb").MongoClient;
  const uri = "mongodb+srv://Regnad2:AHsgzEzsEtgbpn1x@cluster0.dc7sz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function getId(raw){
    try{
      return new ObjectId(raw);
    }catch(err){
      return "";
    }
  }


// Autók nyilvántartása
app.get("/Cars", function (req, res) {
    const client = getClient();
    client.connect(async (err) => {
      const collection = client.db("Car_shop").collection("Cars");
     const cars = await collection.find().toArray();
     res.send(cars);
      client.close();
    });
  })
  
  app.get("/Cars/:id", function(req,res){
  
    const id = new getId(req.params.id);
    if(!id){
        res.send({error: "invalid id"});
        return;
    }
  
    const client = getClient();
    client.connect(async (err) => {
     const collection = client.db("Car_shop").collection("Cars");
     const car = await collection.findOne({_id: id});
     if(!car){
      res.send({error: "not found"});
      return;
     }
     res.send(car);
      client.close();
    });
  });

  app.delete('/Cars/:id', function(req,res){
    const id = new getId(req.params.id);
    if(!id){
        res.send({error: "invalid id"});
        return;
    }
  
    const client = getClient();
    client.connect(async (err) => {
      const collection =  client.db("Car_shop").collection("Cars");
     const result = await collection.deleteOne({_id: id});
     if(!result.deletedCount){
      res.send({error: "not found"});
      return;
     }
     res.send({id: req.params.id});
      client.close();
    });
  });


  app.put('/Cars/:id',bodyParse.json(), function(req,res){
    const updatedCar={
      Name: req.body.Name,
      Fuel: req.body.Fuel,
      Year: req.body.Year,
      Price: req.body.Price,
    };
  
    const id = new getId(req.params.id);
    if(!id){
        res.send({error: "invalid id"});
        return;
    }
  
    const client = getClient();
    client.connect(async (err) => {
      const collection = client.db("Car_shop").collection("Cars");
     const result = await collection.findOneAndUpdate({_id: id}, {$set: updatedCar});
     if(!result.ok){
      res.send({error: "not found"});
      return;
     }
     res.send(result.value);
      client.close();
    });
  });


  app.post('/Cars',bodyParse.json(), function(req,res){
    const newCar={
        Name: req.body.Name,
        Fuel: req.body.Fuel,
        Year: req.body.Year,
        Price: req.body.Price,
    };
  
    const client = getClient();
    client.connect(async (err) => {
      const collection = client.db("Car_shop").collection("Cars");
     const result = await collection.insertOne(newCar);
     if(!result.insertedCount){
      res.send({error: "insert error"});
      return;
     }
     res.send(newCar);
      client.close();
    });
  });



  // Felhasználó

  app.get("/Registered", function (req, res) {
    const client = getClient();
    client.connect(async (err) => {
      const collection = client.db("User").collection("Registered");
     const cars = await collection.find().toArray();
     res.send(cars);
      client.close();
    });
  })
  

  app.post('/Registered',bodyParse.json(), function(req,res){
    const newUser={
        Name: req.body.Name,
        Password: req.body.Password,
    };
  
    const client = getClient();
    client.connect(async (err) => {
      const collection = client.db("User").collection("Registered");
     const result = await collection.insertOne(newUser);
     if(!result.insertedCount){
      res.send({error: "insert error"});
      return;
     }
     res.send(newUser);
      client.close();
    });
  });

  app.delete('/Registered/:id', function(req,res){
    const id = new getId(req.params.id);
    if(!id){
        res.send({error: "invalid id"});
        return;
    }
  
    const client = getClient();
    client.connect(async (err) => {
      const collection =  client.db("User").collection("Registered");
     const result = await collection.deleteOne({_id: id});
     if(!result.deletedCount){
      res.send({error: "not found"});
      return;
     }
     res.send({id: req.params.id});
      client.close();
    });
  });


app.listen(4000);