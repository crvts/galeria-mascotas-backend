const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(express.json());
app.use(cors());



// CONEXIÓN MONGODB

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("✅ MongoDB conectado");

})

.catch(error=>{

console.log("❌ Error MongoDB:",error);

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





// GET MOSTRAR

app.get("/mascotas", async(req,res)=>{


try{


const mascotas = await Mascota.find();


res.json(mascotas);



}catch(error){


res.status(500).json({
error:error.message
});


}



});







// POST REGISTRAR

app.post("/mascotas", async(req,res)=>{


try{


const nuevaMascota =
new Mascota(req.body);



await nuevaMascota.save();



res.json({

mensaje:"Mascota registrada",

nuevaMascota

});



}catch(error){


res.status(500).json({

error:error.message

});


}



});








// PUT ACTUALIZAR

app.put("/mascotas/:id", async(req,res)=>{


try{


const mascota =
await Mascota.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);



res.json({

mensaje:"Mascota actualizada",

mascota

});



}catch(error){


res.status(500).json({

error:error.message

});


}



});







// DELETE ELIMINAR

app.delete("/mascotas/:id", async(req,res)=>{


try{


await Mascota.findByIdAndDelete(
req.params.id
);



res.json({

mensaje:"Mascota eliminada"

});



}catch(error){


res.status(500).json({

error:error.message

});


}



});







// SERVIDOR

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{


console.log(
`🚀 Servidor activo en puerto ${PORT}`
);


});