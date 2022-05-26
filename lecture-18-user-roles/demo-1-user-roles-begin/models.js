import mongoose from "mongoose"

let models = {}

dbConnect()

async function dbConnect() {
    console.log("trying to connect to mongodb database")
    await mongoose.connect("mongodb://localhost:27017/commenting_site")

    console.log("connected to the database!")

    // set up schemas and models
    const commentSchema = new mongoose.Schema({
        username: String,
        comment: String
    })
    models.Comment = mongoose.model("comment", commentSchema)

    console.log("created db models and schemas")
}


export default models;