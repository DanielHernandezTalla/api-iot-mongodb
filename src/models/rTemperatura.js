const mongoose = require("mongoose");
const { Schema } = mongoose;

const rTerperaturaSchema = new Schema({
    data: String,
    fecha: String,
});

module.exports = mongoose.model("rTemperatura", rTerperaturaSchema);
