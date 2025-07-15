const auth = require("../middlewares/auth")

const {generateChat}=require("../controllers/chat.controller")
const router=require('express').Router()
router.post("/generate",auth,generateChat)

module.exports=router