import mongoose from "mongoose"

let models = {}

dbConnect()

async function dbConnect() {
    console.log("trying to connect to mongodb database")
    await mongoose.connect("mongodb://localhost:27017/playlists")

    console.log("connected to the database!")

    // set up schemas and models
    const userSchema = new mongoose.Schema({
        username: String
    })
    models.User = mongoose.model("User", userSchema)

    console.log("created db models and schemas")
}


export default models;