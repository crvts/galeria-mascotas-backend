const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

// CONEXIÓN MONGO

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("🐾 MongoDB conectado");
})
.catch(error=>{
console.log("Error Mongo:",error);
});

// MODELO MASCOTA

const MascotaSchema = new mongoose.Schema({

nombre:{
type:String,
required:true
},

tipo:String,

edad:Number,

dueno:String,


fechaRegistro:{
type:Date,
default:Date.now
}

});

const Mascota = mongoose.model(
"Mascota",
MascotaSchema
);

// PRUEBA

app.get("/",(req,res)=>{

res.send("Servidor de mascotas funcionando 🐶");

});





// MOSTRAR MASCOTAS


app.get("/mascotas",async(req,res)=>{


try{

const mascotas = await Mascota.find();

res.json(mascotas);


}catch(error){

res.status(500).json({
error:error.message
});


}


});

// GUARDAR MASCOTA


app.post("/mascotas",async(req,res)=>{


try{

const nuevaMascota =
new Mascota(req.body);

await nuevaMascota.save();

res.json({

mensaje:"Mascota registrada 🐾",

nuevaMascota


});

}catch(error){


res.status(500).json({

error:error.message

});


}


});


const PORT=3000;

app.listen(PORT,()=>{

console.log(
`🚀 Servidor activo en puerto ${PORT}`
);

});