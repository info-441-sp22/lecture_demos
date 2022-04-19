import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))
async function main(){
    console.log('connecting to mongodb')
    await mongoose.connect('mongodb://localhost:27017/info_upload')

    console.log('succesffully connected to mongodb!')

    const userSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        favorite_ice_cream: String
    })

    models.User = mongoose.model('User', userSchema)
    console.log('mongoose models created')
}

export default models;