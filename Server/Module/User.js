const {Schema,model}=require("mongoose")
const User=new Schema({
    First_Name:{type:String,require:true},
    Last_Name:{type:String,require:true},
    EMail:{type:String,require:true},
    Password:{type:String,require:true},
    Phone_Number:{type:String,require:true},
    Gender:{type:String,require:true},
    Date:{type:String,require:true},
    Country:{type:String,require:true},
    Photo:{ photoData: Buffer},
    //Pronounce:{type:String,require:true},
    Roles:{type:String,ref:"Role"},
})
module.exports=model("User",User)