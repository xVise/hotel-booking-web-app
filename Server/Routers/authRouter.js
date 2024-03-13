const Router=require("express")
const router=new Router()
const controller =require("../Controllers/authController")
const {check}=require("express-validator")
const authMiddleware=require("../middleware/authmiddleware")
router.post("/registration",[
    check("First_Name","Ім`я користувача не може бути пустим").notEmpty(),
    check("Last_Name","Прізвище користувача не може бути пустим").notEmpty(),
    check("EMail","Пошта користувача не може бути пустим").notEmpty(),
    check("Password","Пароль користувача не може бути пустим").notEmpty(),
    check("Phone_Number","Номер телефону користувача не може бути пустим").notEmpty(),
    check("Gender","Гендер користувача не може бути пустим").notEmpty(),
    check("Date","Дата народження користувача не може бути пустим").notEmpty(),
    check("Country","Країна користувача не може бути пустим").notEmpty(),
    ],controller.registration)
router.post("/login",controller.login)
router.get("/users",authMiddleware,controller.getUsers)
module.exports=router

