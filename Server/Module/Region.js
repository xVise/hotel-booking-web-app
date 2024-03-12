const {Schema,model}=require("mongoose")
const Region=new Schema({
    Region_Name:{type:String,require:true}
})
module.exports=model("Region",Region)