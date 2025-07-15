const mongoose= require("mongoose")

const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is requirede"]
    }
},{
    timestamps:true,
    
})

userSchema.pre("save",async function(next){
   if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10)
   }
   next()
})
const User=mongoose.model("User",userSchema)

module.exports=User