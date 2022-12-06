const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    contraseña: String,
});

usuarioSchema.methods.encryptPassword = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10));
};

usuarioSchema.methods.comparePassword = (contraseña) => {
    return bcrypt.compareSync(contraseña, this.contraseña);
};

module.exports = mongoose.model("usuario", usuarioSchema);
