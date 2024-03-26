const Router=require("express")
const router=new Router()
const controller =require("../Controllers/authController")
const {check}=require("express-validator")
const authMiddleware=require("../middleware/authmiddleware")
router.post("/registration",controller.registration)
router.post("/login",controller.login)
router.post("/Email_code",controller.GetEmail)
router.post("/Code",controller.SendCode)
router.post("/newpass",controller.NewPass)
router.post("/registrationCode",controller.RegCode)
router.get("/decode",controller.RegcodeDecoder)
router.get("/users",authMiddleware,controller.getUsers)


module.exports=router

