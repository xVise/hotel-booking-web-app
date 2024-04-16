const Role=require("../Module/Role")
const User=require('../Module/User')
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
const upload = multer({ dest: 'uploads/' }); 

const decodeToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded)
        return decoded;
    } catch (error) {
        // Обробка помилок при розшифруванні токену
        console.error('Помилка при розшифруванні токену:', error.message);
        return null;
    }
}
const generateAcessToken=(id,roles)=>{
    const payload={
        id,
        roles
    }
    return jwt.sign(payload,secret,{expiresIn: "1h"})
}

const generateCodeToken=(id,code)=>{
    const payload={
        id,
        code
    }
    return jwt.sign(payload,secret,{expiresIn: "1h"})
}
const generateRegtoken=(firstName,lastName,sex,bDate,telephone,country,email,heshpassword,code)=>{
    const payload={
        firstName,
        lastName,
        sex,
        bDate,
        telephone,
        country,
        email,
        heshpassword,
        code
    }
    return jwt.sign(payload,secret,{expiresIn: "1h"})
}
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pythonmail1984@gmail.com',
        pass: 'dori pxty yult livc'
    }
});
function sendVerificationEmail(email, code) {
    const mailOptions = {
        from: 'pythonmail1984@gmail.com',
        to: email,
        subject: 'Код підтвердження',
        text: `Ваш код підтвердження: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Помилка при відправці електронної пошти:', error);
        } else {
            console.log('Електронна пошта надіслана: ' + info.response);
        }
    });
}
function generateVerificationCode() {
    return Math.random().toString(36).substr(2, 6);
}
class  AuthController{
    async Filedownload(req, res, next) {
        try {
            console.log(req.headers)
            var token=req.headers.authorization;
            console.log(token)
            const decodedToken = decodeToken(token, secret);
            console.log("|||||||||||||||||||||")
            console.log(req)
            
            const uploadedFile = req.file;
            const newFile = new Files({
                filename: uploadedFile.originalname,
                mimetype: uploadedFile.mimetype,
                size: uploadedFile.size,
                path: uploadedFile.path, // buffer - це дані файлу
                User_Id:decodedToken.id
            });
    
            // Зберігаємо файл у базі даних
            await newFile.save();
            console.log(uploadedFile); // Це об'єкт файлу, який містить інформацію про завантажений файл
            res.status(200).json({ message: "File uploaded successfully" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Error uploading file" });
        }
    }

    // Додайте middleware для завантаження файлів перед викликом методу Filedownload
    uploadMiddleware(req, res, next) {
        upload.single('file')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Обробка помилок, пов'язаних з multer
                console.error("Multer Error:", err);
                return res.status(400).json({ message: "Error uploading file" });
            } else if (err) {
                // Інші помилки
                console.error("Other Error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            // Якщо все в порядку, передаємо управління методу Filedownload
            next();
        });
    }
    async FileUpload(req, res, next) {
        try {
            console.log(req.headers.authorization)
            var token=req.headers.authorization
            const decodedToken = decodeToken(token, secret);
            console.log(decodedToken)
            
            const file = await Files.find({ User_Id: decodedToken.id });
        
            console.log(file)
            if (file) {
                res.set('Content-Type', 'application/octet-stream'); // Встановлюємо загальний тип медіа
                res.send(file);
            } else {
                res.status(404).json({ message: 'Файл не знайдено' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
    async Download(req,res){
        try {
        
                    const file_ID = req.params._id;
                    console.log(file_ID)
                    // Зчитуємо файл з MongoDB за його ім'ям
                    const file = await Files.findById(file_ID);
                    if (file) {
                        // Якщо файл знайдено, відправляємо його клієнту
                        res.set('Content-Type', file.mimetype); // Встановлюємо тип контенту з файлу
                        res.send(file.data.buffer); // Відправляємо дані файлу як буфер
                    } else {
                        // Якщо файл не знайдено, повертаємо статус 404
                        res.status(404).json({ message: 'Файл не знайдено' });
                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Помилка сервера' });
                }
    }
    async registration(req,res){
        try {
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка реєстрації",errors})
            }
            const { firstName, lastName, sex, bDate, telephone, country, email, password } = req.body;
            const heshpassword=bcrypt.hashSync(password,10)
            const verificationCode=generateVerificationCode();
            sendVerificationEmail(email,verificationCode);
            const  token=generateRegtoken(firstName,lastName,sex,bDate,telephone,country,email,heshpassword,verificationCode)
            return res.json({token})



        }catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async Update(req,res){
        try{
            const { firstName, lastName, sex, bDate, telephone, country, EMail, Photo, Authorization } = req.body;
            const decodedToken = decodeToken(Authorization, secret);
           
            const users=await User.findById(decodedToken.id);
            console.log(users)
            console.log("Server")
            console.log(Photo);
            const photoBuffer = Buffer.from(Photo, 'base64');
            console.log("Server121313")
            console.log(photoBuffer)
            const result=await User.updateOne({_id:decodedToken.id},{
                First_Name: firstName,
                Last_Name: lastName,
                EMail: EMail,
                Phone_Number: telephone,
                Gender:sex,
                Date:bDate,
                Photo: {
                    photoData: photoBuffer 
                },
                Country:country,
            })
            return res.json("ok")
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
    async NewPass(req,res){
        const {_id,NewPass}=req.body

        const heshpassword=bcrypt.hashSync(NewPass,10)
        const result=await User.updateOne({_id:_id},{Password:heshpassword})
        return res.json("ok")
    }
    async RegcodeDecoder(req,res){
        try {
            const decodedToken = decodeToken(req.headers.authorization, secret);
            res.json(decodedToken)
        }catch (e) {
            console.error('Error fetching user profile:', e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    async GetEmail(req,res){
        try {
            const {EMail}=req.body
            const user=await  User.findOne({EMail})
            if(!user){
                return res.status(501).json({message:'користувач не найдений'})
            }
            return res.json("Ok")
        }catch (e) {
            console.error('Error fetching user profile:', e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    async RegCode(req, res) {
        try {
            console.log("ok");
            const { firstName, lastName, sex, bDate, telephone, country, email, heshpassword } = req.body;
            const photodata = path.join(__dirname, '..', 'photo', 'phot.jpg');
            fs.readFile(photodata, async (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                console.log("Server");
                console.log(heshpassword);
                try {
                    const Reg_inform = new User({
                        First_Name: firstName,
                        Last_Name: lastName,
                        EMail: email,
                        Password: heshpassword,
                        Phone_Number: telephone,
                        Gender: sex,
                        Date: bDate,
                        Country: country,
                        Photo: {
                            photoData: data
                        },
                        Roles: "USER",
                    });
                    console.log(Reg_inform);
                    await Reg_inform.save();
                    console.log('User profile saved:', Reg_inform);
                    return res.json("Ok");
                } catch (error) {
                    console.error('Error saving user profile:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }
            });
        } catch (e) {
            console.error('Error fetching user profile:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    
    async SendCode(req,res){
        try {
            const {EMail}=req.body
            const user=await User.findOne({EMail})
            const verificationCode=generateVerificationCode();
            console.log(user)
            console.log(user._id)
            sendVerificationEmail(EMail,verificationCode);
            const token=generateCodeToken(user._id,verificationCode);
            console.log(token)
            return res.json({token})
        }catch (e) {
            console.error('Error fetching user profile:', e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
module.exports=new AuthController()