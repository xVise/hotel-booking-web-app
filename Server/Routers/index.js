const Router=require('express')
const router=new Router()
const AuthRouter=require("./authRouter")
const Main=require("./MainRouter")

router.use("/user",AuthRouter)
router.use("/main",Main)

module.exports=router