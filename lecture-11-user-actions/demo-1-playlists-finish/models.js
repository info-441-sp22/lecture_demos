import mongoose from "mongoose"

let models = {}

dbConnect()

async function dbConnect() {
    console.log("trying to connect to mongodb database")
    await mongoose.connect("mongodb://localhost:27017/playlists")

    console.log("connected to the database!")

    // set up schemas and models
    const userSchema = new mongoose.Schema({
        username: String,
        favorite_bands: [String]
    })
    models.User = mongoose.model("User", userSchema)

    const playlistSchema = new mongoose.Schema({
        title: String,
        songs: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    })
    models.Playlist = mongoose.model("Playlist", playlistSchema)

    console.log("created db models and schemas")
}


export default models;