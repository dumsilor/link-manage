import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {vols} from "../../src/app/backup"

const app = express()

app.use(express.json())


mongoose.connect('mongodb://jutsujen:f%40!ry-T%40!l@118.67.213.117:27017/navigatorDB?authMechanism=DEFAULT&tls=false').then(()=>{console.log("Connected")}).catch((err)=>console.log(err))

const headerSchema = new mongoose.Schema({
    headerName: String
})

interface IBackup {
    projectName: string,
    projectURL: string,
    volumeName: string,
    volumeURL: string
}

const backupSchema =  new mongoose.Schema<IBackup>({
    projectName: String,
    projectURL: String,
    volumeName: String,
    volumeURL: String
})

const Backup =  mongoose.model<IBackup>("backup",backupSchema)

app.get("/seed-backup", async (req,res)=>{
    const result = await Backup.insertMany(vols);
    res.status(200).send(`Successfully seeded ${result.length} records.`);
})

app.get("/", (req,res)=>{
    res.send("Server Ran Properly")
})


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})