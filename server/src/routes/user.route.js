const express=require('express')

const {register, login, logout,getMe}=require("../controllers/user.controller")
const auth =require("../middlewares/auth")
const router=express.Router();
router.post("/register", register)
router.post("/sign-in", login)
router.post("/logout",logout)
router.post("/Me",auth,getMe)

module.exports= router