const Role=require("../Module/Role")
const User=require('../Module/User')
const  Region=require("../Module/Region")
const  axios=require("axios")
class  AuthController{
    async registration(req,res){
        try {
            const { firstName, lastName, sex, bDate, telephone, country, email, password } = req.body;
            console.log(req)
            const Reg_inform=User({
                First_Name: firstName,
                Last_Name: lastName,
                EMail: email,
                Password: password,
                Phone_Number: telephone,
                Gender:sex,
                Date:bDate,
                Country:country,
                Roles:"USER",
            })

            await Reg_inform.save()
            res.json("Reg ok")
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
            const Reg=Region({Region_Name:"Чернівецька обл"})
            await Reg.save()
            res.json("server work")
        }catch (e) {

        }
    }
}
module.exports=new AuthController()