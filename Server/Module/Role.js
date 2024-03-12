const {Schema,model}=require("mongoose")
const Role=new Schema({
    Value:{type: String,unique:true},
})
module.exports=model("Role",Role)