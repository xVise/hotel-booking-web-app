const Router=require('express')
const router=new Router()
const AuthRouter=require("./authRouter")

router.use("/user",AuthRouter)

module.exports=router