const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
const ObjectI= require('mongodb').ObjectID
const app = express()
const port =5000
app.use(cors())
app.use(bodyParser.json())

;

const MongoClient = require('mongodb').MongoClient;
const uri =` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b20nz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology : true });
client.connect(err => {
  const serviceCollection = client.db("mobile").collection("services");
  const  OrderCollection = client.db("mobile").collection("saveOrder");
  const  AdminCollection = client.db("mobile").collection("addAdmin");
  const  ReviewCollection = client.db("mobile").collection("addReview");
 console.log("connected")

  app.post("/addService",(req, res) => {
    let added=req.body;
    serviceCollection.insertOne(added)
    .then(result=> {
      res.send(result.insertedCount > 0)
    })
  })
  app.post("/addadmin",(req, res) => {
    let admi=req.body;
    AdminCollection.insertOne(admi)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
   
  })
  app.post("/addreview",(req, res) => {
    let review=req.body;
    ReviewCollection.insertOne(review)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
   
  })
  app.get('/showReview',(req,res)=>{
   ReviewCollection.find()
    .toArray((error,doc)=>{
      res.send(doc)
    })
      })

  app.delete('/deleteOrder/:id',(req,res)=>{

    let id=ObjectI(req.params.id)
    OrderCollection.findOneAndDelete({_id:id})
   .then(result=>{
     res.send(result==true)
     console.log(result.ok)
   })
 
   })
  app.post("/addorder",(req, res) => {
    let add=req.body;
    OrderCollection.insertOne(add)
    .then(result=>{
      res.send(result.insertedCount > 0)
      console.log(result)
    })
  })
  app.get("/showOrder",(req,res)=>{
      OrderCollection.find()
      .toArray((error,doc)=>{
        res.send(doc)
      })


  })


  app.get('/showservices',(req,res)=>{
serviceCollection.find()
.toArray((error,doc)=>{
  res.send(doc)
})
  })
  
});


    
app.listen(process.env.PORT|| port)







