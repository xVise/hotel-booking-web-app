const {Schema,model}=require("mongoose")
const Region=new Schema({
    Region_Name:{type:String,require:true},
    Photo:{ photoData: Buffer},
})
module.exports=model("Region",Region)