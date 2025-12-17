const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 500;

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('book server is runnig!')
})
const uri = "mongodb+srv://bookDB:nrfUt4UvHQ6wadsR@app.zxmaonq.mongodb.net/?appName=app";


const client = new MongoClient(uri,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
});
// bookDB data base name
async function run(){
    try{
  await client.connect();
 const db = client.db('bookDB');
 const bookCollection = db.collection('books');

app.get('/books/:id',async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await bookCollection.findOne(query);
    res.send(result);
})

//get latest 6 book



//  get all books api



// book update api


//  post api

// delete api


  await client.db('admin').command({ping:1});
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
run().catch(console.dir)


app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
    
})
