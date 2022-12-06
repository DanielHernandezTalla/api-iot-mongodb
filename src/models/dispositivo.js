const mongoose = require("mongoose");
const { Schema } = mongoose;

const dispositivoSchema = new Schema({
    data: String,
    fecha: String,
});

module.exports = mongoose.model("dispositivo", dispositivoSchema);
