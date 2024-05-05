const Router=require("express")
const router=new Router()
const path = require('path');
const multer = require('multer');
const upload = multer();
const controller =require("../Controllers/MainController.js")
router.post("/Regions",controller.Pull_Reions)
router.get('/getRegion',controller.GetRegion)
router.post("/Hoteladd",upload.any(), controller.ADD_Hotel)
router.post("/getRegioname",controller.Get_Name)
router.post("/GetHotels",controller.Get_Hotels)
module.exports=router