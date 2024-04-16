const Router=require("express")
const router=new Router()
const controller =require("../Controllers/authController")
const {check}=require("express-validator")
const Files = require('../Module/File');
const authMiddleware=require("../middleware/authmiddleware")
router.post("/registration",controller.registration)
router.post("/login",controller.login)
router.post("/Email_code",controller.GetEmail)
router.post("/Code",controller.SendCode)
router.post("/newpass",controller.NewPass)
router.post("/registrationCode",controller.RegCode)
router.post("/Updateinfo",controller.Update)
router.get("/decode",controller.RegcodeDecoder)
router.get("/users",authMiddleware,controller.getUsers)
router.post('/files', controller.uploadMiddleware, controller.Filedownload);
router.get("/filesUpload",controller.FileUpload)
router.get('/:_id', async (req, res) => {
    try {
        const file_ID = req.params._id;
        // Зчитуємо файл з MongoDB за його _id
        const file = await Files.findById(file_ID);
        console.log(file)
        if (file) {
            // Якщо файл знайдено, відправляємо його клієнту
            res.sendFile(file.path); // Відправляємо файл клієнту
        } else {
            // Якщо файл не знайдено, повертаємо статус 404
            res.status(404).json({ message: 'Файл не знайдено' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

module.exports=router

