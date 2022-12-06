const mongoose = require("mongoose");
const { Schema } = mongoose;

const temxapr = new Schema({
    temperatura: Number,
    aperturas: Number,
    fecha: String,
});

module.exports = mongoose.model("temxapr", temxapr);
