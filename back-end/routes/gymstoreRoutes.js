const express=require("express")
const router=express.Router()
const {signup,login}=require("../controller/auth")
const {auth,isBuyer,isSeller}=require("../middlewares/auth")
const {getItemsController}=require('../controllers/itemControllers')

router.post("/signup",signup)
router.post("/login",login)
router.get("/getItems",auth,getItemsController)

module.exports=router