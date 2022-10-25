const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    usuario_id: String,
    nombre: String,
    correo: String,
});
