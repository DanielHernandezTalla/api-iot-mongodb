const mongoose = require("mongoose");
const { Schema } = mongoose;

const dispositivoSchema = new Schema({
    nombre: String,
});

module.exports = mongoose.model("dispositivo", dispositivoSchema);
