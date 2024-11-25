import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()

app.use(express.json())


app.connect('mongodb://118.67.213.117:27017/navigatorDB')

const headerSchema = new mongoose.Schema({
    headerName: String
})

const backupSchema =  new mongoose.Schema({
    projectName: String,
    projectURL: String,
    volumeName: String,
    volumeURL: String
})

const Backup = new mongoose.Model("backup",backupSchema)

app.get("/seed-backup", (req,res)=>{
    const newBackup = new Backup({

    })
})

app.get("/", (req,res)=>{
    res.send("Server Ran Properly")
})


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})