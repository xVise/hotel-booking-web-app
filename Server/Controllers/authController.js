const Role=require("../Module/Role")
const User=require('../Module/User')
const  Region=require("../Module/Region")
const  axios=require("axios")
const bcrypt = require('bcryptjs');
class  AuthController{
    async registration(req,res){
        try {
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

        }catch (e) {
            console.log(e)
            res.status(400).json({message:"Login error"})
        }
    }
    async getUsers(req,res){
        try {
            return"ok"
        }catch (e) {

        }
    }
}
module.exports=new AuthController()