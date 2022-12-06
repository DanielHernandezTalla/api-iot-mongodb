"use strict";
const Usuario = require("../../models/usuario");
const { transporter } = require("../../providers/mailer");

function generateRandomString(num) {
    let result1 = Math.random().toString(36).substring(2, num);

    return result1;
}

async function get() {
    return new Promise(async function (resolve, reject) {
        try {
            // Search on database
            const usuarios = await Usuario.find();

            resolve({
                data: usuarios,
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function getById(id) {
    return new Promise(async function (resolve, reject) {
        try {
            // Search on database
            const usuario = await Usuario.find({ _id: id });

            resolve({
                data: usuario,
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function add({ nombre, correo, contraseña }) {
    return new Promise(async function (resolve, reject) {
        try {
            // Validations

            const newUsuario = new Usuario();
            newUsuario.nombre = nombre;
            newUsuario.correo = correo;
            newUsuario.contraseña = newUsuario.encryptPassword(contraseña);

            await newUsuario.save();

            resolve({
                ok: "Usuario agregado correctamente",
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function update(id, data) {
    return new Promise(async function (resolve, reject) {
        try {
            const usuario = await Usuario.find({ _id: id });

            let newUsuario = {
                ...Object.values(usuario[0])[2],
                ...data,
            };

            await Usuario.updateOne(
                { _id: id },
                {
                    $set: {
                        nombre: newUsuario.nombre,
                        correo: newUsuario.correo,
                    },
                }
            );

            resolve({
                ok: "Usuario actualizado correctamente.",
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function del(id) {
    return new Promise(async function (resolve, reject) {
        try {
            await Usuario.deleteOne({ _id: id });

            resolve({
                ok: "Usuario eliminado correctamente.",
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function changePassword(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const usuario = await Usuario.find({ _id: id });

            let newPassword = generateRandomString(10);

            const newUsuario = new Usuario();
            newUsuario.contraseña = newUsuario.encryptPassword(newPassword);

            await Usuario.updateOne(
                { _id: id },
                {
                    $set: {
                        contraseña: newUsuario.contraseña,
                    },
                }
            );

            // Enviamos el correo al cambiar la contraseña
            let resEmail = await transporter.sendMail({
                from: "Olvidaste tu contraseña <hernandezdany41@gmail.com>",
                to: usuario[0].correo,
                subject: "Olvidaste tu contraseña 💀",
                text:
                    "Estimado usuario su nueva contraseña para acceder al programa es: " +
                    newPassword +
                    ". Si desea un servicio más personalizado favor de contactar a la Mesa de Ayuda, que aun no existe.",
            });

            // console.log("main send");
            // console.log(resEmail);

            resolve({
                ok: "Contraseña actualizada correctamente. Por favor revisa tu correo...",
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    get,
    getById,
    add,
    update,
    del,
    changePassword,
};
