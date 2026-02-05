const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

let app = express();
app.use(cors());

app.get("/countries",async (req,res)=>{
    let countryList = await employee.find().distinct("country")
    res.json(countryList);

})

app.get("/departments",async (req,res)=>{
    let departmentsList = await employee.find().distinct("department")
    res.json(departmentsList);

})

app.get("/genders",async (req,res)=>{
    let gendersList = await employee.find().distinct("gender")
    res.json(gendersList);

})

app.get("/employee",async (req,res)=>{
    let employeeArr = await employee.find().and([
        {country:req.query.country},
        {department:req.query.department},
        {gender:req.query.gender}
    ])
     res.json(employeeArr)
    console.log(req.query)
   
})
// app.get("/employee/:country/:department/:gender",async (req,res)=>{
//     let employeeArr = await employee.find().and([
//         {country:req.params.country},
//         {department:req.params.department},
//         {gender:req.params.gender}
//     ])
//      res.json(employeeArr)
//     console.log(req.params)
   
// })

app.listen(1616,()=>{
    console.log("1616 por is running on server")
})
 
let employeeSchema = mongoose.Schema({
    id:Number,
    firstName : String,
    lastName : String,
    email:String,
    gender: String,
    age: Number,
    profilepic:String,
    department:String,
    country: String

})

let employee = mongoose.model("employees",employeeSchema,"employes")
  



let conectToMDB = async ()=>{
    try{
        mongoose.connect("mongodb+srv://bellammounika640_db_user:mernbach@cluster0.tem9ppq.mongodb.net/MERN2510?appName=Cluster0")
        console.log("SuccesFully Connect To MongoDB")

    }catch(err){
        console.log("Unable To Connect MongoDB")
    }
}
conectToMDB();