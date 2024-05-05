const {Schema,model}=require("mongoose")
const Hotels=new Schema({
    Hotel_Name:{type:String,require:true},
    Description:{type:String},
    Photo: { 
        data: Buffer, // Store the photo data as a Buffer
        contentType: String // Store the content type of the photo
    },
    Stars:{type:Number },
    Region:{type:String},
    City:{type:String},
    Location:{type:String},
    Hotel_type:{type:String},
    Room_Amount:{type:Number }
})
module.exports=model("Hotels",Hotels)