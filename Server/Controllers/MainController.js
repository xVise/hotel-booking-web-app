const Role=require("../Module/Role")
const User=require('../Module/User')
const Reg=require('../Module/Region')
const  Region=require("../Module/Region")
const Hotel=require("../Module/Hotels")
const Files=require('../Module/File')
const  axios=require("axios")
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt=require("jsonwebtoken")
const {secret}=require("./config")
const {validationResult, header}=require("express-validator")
const nodemailer = require('nodemailer');
const multer = require('multer');
const Hotels = require("../Module/Hotels")
const storage = multer.memoryStorage(); // Зберігання файлу у вигляді буфера в пам'яті
const upload = multer({ storage: storage });
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
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pythonmail1984@gmail.com',
        pass: 'dori pxty yult livc'
    }
});
function sendBooking(email,First_Name,Last_Name, Hotel_name, guest_count, rooms, checkinInput, checkoutInput,Region,City,Location ) {
    // Конвертація дат в рядки у форматі ISO8601
    var Check_in = new Date(checkinInput);
    var Check_out = new Date(checkoutInput);
    const checkInString = Check_in.toISOString().slice(0, 10);
    const checkOutString = Check_out.toISOString().slice(0, 10);

    const mailOptions = {
        from: 'pythonmail1984@gmail.com',
        to: email,
        subject: 'Ваше бронювання готелю',
        text: `Шановний(а) ${First_Name} ${Last_Name},\n\n` +
              `Ви успішно забронювали готель ${Hotel_name}.\n` +
              `Який знаходиться в ${Region}\n`+
              `Місто ${City}\n`+
              `${Location}.\n`+
              `Дата заїзду: ${checkInString}\n` + // Використовуємо конвертовані рядки
              `Дата виїзду: ${checkOutString}\n` + // Використовуємо конвертовані рядки
              `Кількість гостей: ${guest_count}\n` +
              `Кількість номерів: ${rooms}\n\n` +
              `Дякуємо за вашу бронь. Бажаємо вам приємного відпочинку!`
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Помилка при відправці електронної пошти:', error);
        } else {
            console.log('Електронна пошта надіслана: ' + info.response);
        }
    });
}

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
    async Get_Name(req,res){
        try {
            const { Reg_id } = req.body;
            
            const region = await Region.findById(Reg_id); // Знайдіть регіон за його _id
            
            if (!region) {
                return res.status(404).json({ message: "Region not found" }); // Якщо регіон не знайдено, поверніть 404
            }
            
            const region_name = region.Region_Name; // Отримайте ім'я регіону

            const hotels = await Hotel.find({ Region: region_name }, 'City');
        
        // Отримати унікальні назви міст
            const uniqueCities = [...new Set(hotels.map(hotel => hotel.City))];
            console.log(uniqueCities)

            return res.json({ region_name,uniqueCities });
      
        } catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async Get_Hotels(req,res){
        try {
            const { Region_name,Type,Stars,City } = req.body;
            
            const query = { Region: Region_name };
            if (Type !== null) {
                query.Hotel_type = Type;
            }
            if (Stars !== null) {
                query.Stars = Stars;
            }
            if(City!==null){
                query.City=City;
            }
            console.log(query)
            const hotels = await Hotel.find(query);
            return res.json({ hotels });
        } catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async Get_Hotel_Info(req,res){
        try {
            const { Hotel_id } = req.body;
            console.log("-------------")
            console.log(Hotel_id)
            const hotel=await Hotel.findById(Hotel_id)
            console.log(hotel)
            return res.json({ hotel });
        } catch (e) {
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }

    }
    async Book_hotel(req,res){
        try{
            const {Hotel_id,token,guest_count,Check_in,Check_out,rooms}=req.body;
            console.log(Check_in)
            const decodedToken = decodeToken(token, secret);
            var userinfo = await User.findById(decodedToken.id);
            console.log(userinfo)
            var hotelinfo=await Hotel.findById(Hotel_id)
            sendBooking(userinfo.EMail,userinfo.First_Name,userinfo.Last_Name,hotelinfo.Hotel_Name,guest_count,rooms,Check_in,Check_out,hotelinfo.Region,hotelinfo.City,hotelinfo.Location)
            const message = `Повідомлення відправлене на пошту ${userinfo.EMail}.`;
        
            
            res.send(message);
        }catch(e){
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async ADD_Hotel(req,res){
        try {
            // Assuming req.files is an array containing multiple files
            for (const file of req.files) {
                const { mimetype, buffer } = file;
                console.log("Mimetype:", mimetype);
                console.log("Buffer:", buffer);
                
                // Create a new Hotel document for each file
                const hotel = new Hotel({
                    Hotel_Name: req.body.Hotel_name,
                    Description: req.body.Description,
                    Stars: req.body.Stars,
                    Region: req.body.Region,
                    City: req.body.City,
                    Location: req.body.Location,
                    Hotel_type: req.body.Type,
                    Room_Amount: req.body.Count,
                    Photo: {
                        data: buffer, // Save the photo data
                        contentType: mimetype // Save the MIME type
                    }
                });
                await hotel.save()
                
            }
        } catch (error) {
            console.error("Error:", error);
        }
        

    }

}
module.exports=new MainController()