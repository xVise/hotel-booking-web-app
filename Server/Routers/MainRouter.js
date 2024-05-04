const Router=require("express")
const router=new Router()
const path = require('path');

const controller =require("../Controllers/MainController.js")
router.post("/Regions",controller.Pull_Reions)
router.get('/getRegion',controller.GetRegion)
module.exports=router