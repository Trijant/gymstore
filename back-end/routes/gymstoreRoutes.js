const express=require("express")
const router=express.Router()
const {signup,login}=require("../controllers/auth")
const {auth,isBuyer,isSeller}=require("../middlewares/auth")
const {getItemController,addItemController,addToCartController,removeFromCartController}=require('../controllers/itemControllers')

router.post("/signup",signup)
router.post("/login",login)
router.get("/getItems",getItemController)
router.put("/addItem",auth,isSeller,addItemController)
router.post("/addToCart",auth,isBuyer,addToCartController)
router.post("/removeFromCart",auth,isBuyer,removeFromCartController)

module.exports=router