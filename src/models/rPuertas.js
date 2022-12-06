const mongoose = require("mongoose");
const { Schema } = mongoose;

const rPuertaPrincipalSchema = new Schema({
    data: String,
    fecha: String,
});

const rPuertaCongeladorSchema = new Schema({
    data: String,
    fecha: String,
});

module.exports = {
    RPuertaPrincipal: mongoose.model(
        "rPuertaPrincipal",
        rPuertaPrincipalSchema
    ),
    RPuertaCongelador: mongoose.model(
        "rPuertaCongelador",
        rPuertaCongeladorSchema
    ),
};
