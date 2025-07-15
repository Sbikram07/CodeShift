const User = require("../models/User.model")
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')


exports.register = async function (req, res) {
   
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "All Fields are Mandatory"
            })
        }
        const user = await User.create({ username, email, password })
        if (!user) {
            return res.status(401).json({
                message: "something went wrong while registering the user"
            })
        }
        return res.status(200).json({
            message: 'user registered successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,

            }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

exports.login = async function (req, res) {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All Fields are Mandatory"
            })
        }
        const dbUSer = await User.findOne({ email });

        if (!dbUSer) {
            return res.status(404).json({
                message: "User not Found "
            })
        }

        const result = await bcrypt.compare(password, dbUSer.password);

        if (!result) {
            return res.status(402).json({
                message: 'Pasword is incorrect'
            })
        }

        const token=jwt.sign({_id:dbUSer._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie('token',token,{
            httpOnly:true,
            //secure:process.env.NODE_ENV==='production',
           
            expires:new Date(
                Date.now()+30*24*60*60*1000
            )
        });


        // return res.status(200).json({
        //     message: 'user logged in successfully'
        // })

        res.json({success:true,token,user:{_id:dbUSer._id,username:dbUSer.username,email:dbUSer.email}})
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

};

exports.logout=async(req,res)=>{
    try{
        res.clearCookie('token');
        res.json({
            message:"Logged out Successfully"
        });

    }catch(err){
        res.status(500).json({error:err.message})
    }
};

exports.getMe=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(!user) return res.status(404).json({error:"user not found"});
        res.json({
            _id:user._id,username:user.username,email:user.email
        });
    }catch(err){
        res.status(500).json({
            error:err.message
        });
    }
};