import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {vols} from "../../src/app/backup"

const app = express()

app.use(express.json())
app.use(cors())

const MONGO_URI = 'mongodb://jutsujen:f%40!ry-T%40!l@118.67.213.117:27017/navigatorDB?authSource=admin'

mongoose.connect(MONGO_URI).then(()=>{console.log("Connected")}).catch((err)=>console.log(err))

const headerSchema = new mongoose.Schema({
    headerName: String
})

interface IBackup {
    projectName: string,
    projectURL: string,
    volumeName: string,
    volumeURL: string
}

interface IUpdate {
    Date: string,
    Details: string,
    Reference: string,
    Remarks: string,
    Sales: string,
    Handler: string,
    Status: string,
    deleted: boolean
}

const backupSchema =  new mongoose.Schema<IBackup>({
    projectName: String,
    projectURL: String,
    volumeName: String,
    volumeURL: String
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  })

const updateSchema = new mongoose.Schema<IUpdate>({
    Date: String,
    Details: String,
    Reference: String,
    Remarks: String,
    Sales: String,
    Handler: String,
    Status: String,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
})

const BackupModel =  mongoose.model<IBackup>("backup",backupSchema)
const UpdateModel = mongoose.model<IUpdate>("update", updateSchema)


app.get("/seed-backup", async (req,res)=>{
    // const backupCount = await BackupModel.countDocuments();
    // if (backupCount > 0) {
    //     res.send("Seed already done")
    // }
    BackupModel.create(vols)
})

app.get("/", (req,res)=>{
    res.send("Server Ran Properly")
})

app.get("/api/backup", async (req,res)=>{
    const allBackup = await BackupModel.find({}).sort({ projectName: 'asc' })
    res.send(allBackup)
})

app.get("/api/update", async (req,res)=>{
    const allUpdate = await UpdateModel.find({ deleted: { $ne: true} }).sort({ Date: 'asc' })
    res.status(200).send(allUpdate);
})


app.post("/api/update/add", async (req,res)=>{
    const {Date, Details, Reference, Remarks, Sales, Handler, Status, deleted} = req.body;
    const newBackup = new UpdateModel({
        Date: Date,
        Details: Details,
        Reference: Reference,
        Remarks: Remarks,
        Sales: Sales,
        Handler: Handler,
        Status: Status,
        deleted: deleted
    })

    await newBackup.save().then(()=>{
        res.status(201).json({ message: "Document saved successfully", success: true })
    }).catch((err)=> {
      res.status(500).json({ error: err.message });
})
})

app.post("/api/update/complete", async(req,res)=>{
     const id = req.body.id;
     const status = req.body.Status;
    const update = await UpdateModel.findOneAndUpdate({_id: id},{ Status: status })
    console.log(update)
    if (update) {
        res.send(update)
    }
})

app.post("/api/update/delete", async(req,res)=>{
    const id = req.body.id; 
    console.log(id)
    const deleteTask = await UpdateModel.findOneAndUpdate({_id: id},{deleted: true}).then(()=>res.status(201).json({message: "Deleted Successfully"})).catch((err)=>res.status(500).send(err))
})


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})