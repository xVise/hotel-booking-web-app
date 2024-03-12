const express =require("express");
const mongoose =require("mongoose")
const path = require('path');
const PORT=8080
const  authRouter=require("./Routers/authRouter")
const app=express()
app.use(express.json())
app.use("/auth",authRouter)
const publicDirectoryPath = path.join(__dirname, 'public');
console.log(__dirname)
app.use(express.static(publicDirectoryPath));
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const start=async()=>{
    try {
        await mongoose.connect("mongodb+srv://kn22dsafonchyk:4ohHntpL4zTUfJRk@cluster0.fjmwpsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        app.listen(PORT,()=>console.log('Servers started on port ${PORT}'))
    }catch (e) {
        console.log(e)
    }
}
start()