const Role=require("../Module/Role")
const User=require('../Module/User')
const Reg=require('../Module/Region')
const  Region=require("../Module/Region")
const Files=require('../Module/File')
const  axios=require("axios")
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt=require("jsonwebtoken")
const {secret}=require("./config")
const {validationResult}=require("express-validator")
const nodemailer = require('nodemailer');
const multer = require('multer');
const storage = multer.memoryStorage(); // Зберігання файлу у вигляді буфера в пам'яті
const upload = multer({ storage: storage });

class MainController{
    
    async Pull_Reions(req,res){
        try {
            const{Region,Photo}=req.body
            
            const photoBuffer = Buffer.from(Photo, 'base64');
            const RegionsInf = new Reg({
                Region_Name: Region,
                Photo: {
                    photoData: photoBuffer
                },
               
            });
            
            await RegionsInf.save();
        }catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async GetRegion(req,res){
        try {
            
            const regions = await Reg.find({}, 'Region_Name Photo _id'); // Вибираємо лише поля Region_Name, Photo та _id
            
            // Відправка масиву областей з обраними полями на клієнтську сторону у відповіді
            return res.json({ regions });
        } catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
}
module.exports=new MainController()