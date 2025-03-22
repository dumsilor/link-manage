import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {vols} from "../../src/app/backup"
//import {all_tools} from "../../src/app/urls"
import crypto from "crypto";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import { error } from "console";


const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI!).then(()=>{console.log("Connected")}).catch((err)=>console.log(err))

const headerSchema = new mongoose.Schema({
    headerName: String
})

interface IDelivery {
    client_name: string,
    delivery_type: string, 
    // "delivery_type" : "Termination",
    // "delivery_type" : "Provision",
    delivery_status: string,
    delivery_date: string,
    remarks: string
}

interface IDay {
    day: string
}

interface IBackup {
    projectName: string,
    projectURL: string,
    volumeName: string,
    volumeURL: string,
    backupDay: Array<IDay>
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

interface ICreds {
    name: string,
    url: string,
    userName: string,
    password: string,
    iv: string
}

const backupSchema =  new mongoose.Schema<IBackup>({
    projectName: String,
    projectURL: String,
    volumeName: String,
    volumeURL: String,
    backupDay: Array<IDay>
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

const credsSchema = new mongoose.Schema({
    name: String,
    url: String,
    userName: String,
    password: String,
    iv: String
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
})


const deliverySchema = new mongoose.Schema({
    client_name: String,
    delivery_type: String, 
    // "delivery_type" : "Termination",
    // "delivery_type" : "Provision",
    delivery_status: String,
    delivery_date: String,
    remarks: String
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
}) 

const BackupModel =  mongoose.model<IBackup>("backup",backupSchema)
const UpdateModel = mongoose.model<IUpdate>("update", updateSchema)
const CredsModel = mongoose.model<ICreds>("credential",credsSchema)
const DeliveryModel = mongoose.model<IDelivery>("delivery",deliverySchema) 

app.get("/", (req,res)=>{
    res.send("Server Ran Properly")
})


app.get("/seed-backup", async (req,res)=>{
    // const backupCount = await BackupModel.countDocuments();
    // if (backupCount > 0) {
    //     res.send("Seed already done")
    // }
   BackupModel.create(vols).catch(error=>(console.log(error)))
})



app.get("/api/backup", async (req,res)=>{
    const allBackup = await BackupModel.find({}).sort({ projectName: 'asc' })
    res.send(allBackup)
})

app.post("/api/backup/search",  async (req,res)=>{
    const searchTerm = req.body.term;
    const foundItems = await BackupModel.find({
        $or: [
            { projectName: new RegExp(searchTerm,"i") },
            { volumeName: new RegExp(searchTerm, "i") }
        ]
    })

    res.status(201).send(foundItems);
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

const passPhase = process.env.PASS_PHASE!;
const secretKey = crypto.createHash('sha256').update(passPhase).digest();

function encryptPassword(password: string){
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(secretKey), iv)
    let encrypted = cipher.update(password)
    encrypted =Buffer.concat([encrypted, cipher.final()])
    return  { iv: iv.toString('hex'), encryptedPassword: encrypted.toString('hex') }
}

function decryptPassword(encryptedPassword: string, iv: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encryptedPassword, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

app.get("/api/seed-creds",async(req,res)=>{
//    const all_creds: ICreds[] = all_tools;
      const all_creds: ICreds[] = [];
      for (const cred of all_creds) {
        const { iv, encryptedPassword} = encryptPassword(cred.password)

        const newCred =new CredsModel({
            name: cred.name,
            url: cred.url,
            userName: cred.userName,
            password: encryptedPassword,
            iv: iv
        })

        await newCred.save()
    }
    res.send("Credentials Seeded successfully")
})

app.get("/api/secrets",async(req,res)=>{
    const all_credentials = await CredsModel.find({});

    const decryptedCredentials = all_credentials.map((cred)=>{
        const decryptedPassword = decryptPassword(cred.password, cred.iv);
        return {
            ...cred.toObject(),
            password: decryptedPassword,
        }
    })
    res.send(decryptedCredentials)

})

//Client-Service-Delivery-Backend
//TODO delivery routing
app.get("/api/delivery", async(req,res)=>{
    const all_tasks = await DeliveryModel.find({})
    res.status(200).send(all_tasks)
})

app.post("/api/delivery/create", async(req,res)=>{
    const {client_name, delivery_type, delivery_status, delivery_date, remarks} = req.body;
    const newDelivery = new DeliveryModel({
        client_name: client_name,
        delivery_type: delivery_type,
        delivery_status: delivery_status,
        delivery_date: delivery_date,
        remarks: remarks
    })
    await newDelivery.save().then(()=>res.status(201).json({ message: "Delivery saved successfully", success: true })).catch((err)=>res.status(500).json({ error: err.message }));
})

//TODO: Check create and read from frontend
//TODO: FIx the file structure
//TODO delivery Create
//TODO delivery Update
//TODO delivery Delete

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
