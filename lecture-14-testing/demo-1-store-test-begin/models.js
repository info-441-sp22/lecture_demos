import mongoose from "mongoose";

connectDB();

let models = {};

async function connectDB() {
  console.log("connecting to mongodb");
  // Put your MongoDB Atlas connection string in, or
  // Run mongo db locally with a command like:
  // Windows: mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: brew services start mongodb-community@5.0
  await mongoose.connect('mongodb://localhost:27017/store');
  console.log("connected to mongodb");

  //Add schemas and models
  const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
  })
  models.Item = mongoose.model('Item', itemSchema)
  
  console.log("finished creating models");
}

export default models;
