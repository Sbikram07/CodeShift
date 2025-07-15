const mongoose=require('mongoose')

const connectDB=async function(){
    try{
        const connection =await mongoose.connect(process.env.MONGO_URL)
         console.log("Database Successfully connected");
    }
    catch (err){
        console.log(err)
    }
}

module.exports =connectDB