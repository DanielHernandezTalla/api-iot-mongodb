const mongoose = require("mongoose");
const { Schema } = mongoose;
const Dispositivo = mongoose.model("dispositivo");

const contenidoSchema = new Schema({
    dispositivo_id: { type: Schema.ObjectId, ref: "dispositivo" },
    nombre: String,
    cantidad: Number,
    unidadMedida: String,
    comentario: String,
    fechaIngreso: Integer64,
    caducidad: Integer64,
});

module.exports = mongoose.model("contenido", contenidoSchema);
