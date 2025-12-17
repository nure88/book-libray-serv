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
app.get('/latest-books', async(req, res) => {
    try {
        const result = await bookCollection.find().sort({_id:-1}).limit(6).toArray();
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Error fetching latest books:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//hilight rating book
app.get('/high-rating', async(req, res) => {
    try{
   const result = await bookCollection.find().sort({_id: 1}).limit(1).toArray();
   res.status(200).json({
    success:true,
    result
   })
    }catch(error){
   res.status(404).json({
    success: false,
    message: "server error"
   })
    }
})

//  get all books api
app.get('/books', async(req,res) => {
    try{
   const result = await bookCollection.find().toArray();
   res.send(result);
    }catch(error){
    res.status(401).json({
        success: true,
        message: "bad request all books!"
    })
    }
})


// book update api
app.put('/books/:id', async(req, res) => {
    try{
 const id = req.params.id;
 const book = req.body;
 console.log(book);
 
const query = {_id: new ObjectId(id)};

const update = {
    $set:{
        title:book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        summary: book.summary
    }
};

const result = await bookCollection.updateOne(query,update);

res.status(200).json({
    success: true,
    message: "book updated successfully!",
    result
})

    }catch(error){
 res.status(401).json({
    success:false,
    message: "book update fail!"
 })
    }
})

//  post api
app.post('/books', async(req, res) => {
try{
 const book = req.body;
 const result =await bookCollection.insertOne(book);
 res.status(200).json({
    success:true,
    message:"book added successfully",
    result
 })
 
}
catch(error){
res.status(401).json({
    success: false,
    message: "book added fail!"
})
}

});
// delete api
app.delete('/books/:id', async(req, res) => {
    try{
 const id = req.params.id;
 const query = {_id: new ObjectId(id)}
 const result = await bookCollection.deleteOne(query);
  res.status(200).json({
    success: true,
    message:"book delete succesfully!",
    result
  })
    }catch(error){
  res.status(401).json({
    success:true,
    message:"book delete fail"
  })
    }
})

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
