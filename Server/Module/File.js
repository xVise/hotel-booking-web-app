const {Schema,model}=require("mongoose")
const Files=new Schema({
    filename: String, // Назва файлу
  mimetype: String, // MIME-тип файлу
  size: Number, // Розмір файлу
  path: String, // Дані файлу у вигляді буфера
  User_Id:{type:String ,ref:"User"}
})
module.exports=model("Files",Files)