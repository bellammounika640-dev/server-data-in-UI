const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// this app is we can store express() function,cors for give acces to server that data display are not
let app = express();
app.use(cors());

// we create seperate country API in this API we can remove duplicates then we can call only unic values in country List
app.get("/countries",async (req,res)=>{
    let countryList = await employee.find().distinct("country")
    res.json(countryList);

})
// same it will Show only uniic values in Departments list
app.get("/departments",async (req,res)=>{
    let departmentsList = await employee.find().distinct("department")
    res.json(departmentsList);

})
// it show only gender unic values in gender list
app.get("/genders",async (req,res)=>{
    let gendersList = await employee.find().distinct("gender")
    res.json(gendersList);

})
// this is main API to give all employee data from database
// Query Strings are used to create variables with URL
app.get("/employee",async (req,res)=>{
    let employeeArr = await employee.find().and([
        {country:req.query.country},
        {department:req.query.department},
        {gender:req.query.gender}
    ])
     res.json(employeeArr)
    console.log(req.query)
   
})
// Params are nathing but variable we are creating with  the URL
// app.get("/employee/:country/:department/:gender",async (req,res)=>{
//     let employeeArr = await employee.find().and([
//         {country:req.params.country},
//         {department:req.params.department},
//         {gender:req.params.gender}
//     ])
//      res.json(employeeArr)
//     console.log(req.params)
   
// })

// we create port number compusary 
app.listen(1616,()=>{
    console.log("1616 por is running on server")
})
// our output is object that object we con't write directly,
// first we create schema this is schema
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
// we create class  this is our class,this expects 3 parameters string, schema,collection name in whatever we give in database that collection name
let employee = mongoose.model("employees",employeeSchema,"employes")

// This function we can connect server to MongoDB(Database)
let conectToMDB = async ()=>{
    try{
        mongoose.connect("mongodb+srv://bellammounika640_db_user:mernbach@cluster0.tem9ppq.mongodb.net/MERN2510?appName=Cluster0")
        console.log("SuccesFully Connect To MongoDB")

    }catch(err){
        console.log("Unable To Connect MongoDB")
    }
}
conectToMDB();