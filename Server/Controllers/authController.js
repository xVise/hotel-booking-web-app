const Role=require("../Module/Role")
const User=require('../Module/User')
const  Region=require("../Module/Region")
const  axios=require("axios")
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const {secret}=require("./config")
const {validationResult}=require("express-validator")
const generateAcessToken=(id,roles)=>{
    const payload={
        id,
        roles
    }
    return jwt.sign(payload,secret,{expiresIn: "1h"})
}
class  AuthController{
    async registration(req,res){
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка реєстрації",errors})
            }
            const { firstName, lastName, sex, bDate, telephone, country, email, password } = req.body;
            console.log("Passs")
            console.log(password)

            const heshpassword=bcrypt.hashSync(password,10)
            console.log(heshpassword)
            console.log("Pass")
            const Reg_inform=User({
                First_Name: firstName,
                Last_Name: lastName,
                EMail: email,
                Password: heshpassword,
                Phone_Number: telephone,
                Gender:sex,
                Date:bDate,
                Country:country,
                Roles:"USER",
            })
            console.log(Reg_inform)
            await Reg_inform.save()

        }catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async login(req,res){
        try {
            const {EMail,Password}=req.body
            const user=await User.findOne({EMail})
            console.log(user)
            if(!user){
                return res.status(501).json({message:'користувач не найдений'})
            }
            const validPassword=bcrypt.compareSync(Password,user.Password)
            if(!validPassword){
                return res.status(502).json({message:'користувач не найдений'})
            }
            const  token =generateAcessToken(user._id,user.roles)
            console.log(token)
            return res.json({token})
        }catch (e) {
            console.log(e)
            res.status(400).json({message:"Login error"})
        }
    }
    async getUsers(req,res){
        try {
            const users=await User.findById(req.user.id);
            res.json(users)
        }catch (e) {
            console.error('Error fetching user profile:', error)
            res.status(500).json({ message: 'Internal server error' })

        }
    }
}
module.exports=new AuthController()