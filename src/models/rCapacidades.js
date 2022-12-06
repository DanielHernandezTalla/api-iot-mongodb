const mongoose = require("mongoose");
const { Schema } = mongoose;

const rCPSSchema = new Schema({
    data: String,
    fecha: String,
});

const rCPISchema = new Schema({
    data: String,
    fecha: String,
});

const rCPlSSchema = new Schema({
    data: String,
    fecha: String,
});

const rCPlMSchema = new Schema({
    data: String,
    fecha: String,
});

const rCPlISchema = new Schema({
    data: String,
    fecha: String,
});

const rCPlVSchema = new Schema({
    data: String,
    fecha: String,
});

module.exports = {
    RCapacidadesPS: mongoose.model("rCapacidadPSuperior", rCPSSchema),
    RCapacidadesPI: mongoose.model("rCapacidadPInferior", rCPISchema),
    RCapacidadesPlS: mongoose.model("rCapacidadPlSuperior", rCPlSSchema),
    RCapacidadesPlM: mongoose.model("rCapacidadPlMedia", rCPlMSchema),
    RCapacidadesPlI: mongoose.model("rCapacidadPlInferior", rCPlISchema),
    RCapacidadesPlVerdura: mongoose.model("rCapacidadPlVerdura", rCPlVSchema),
};
