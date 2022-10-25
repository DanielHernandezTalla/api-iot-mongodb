"use strict";
const Dispositivo = require("../../models/dispositivo");

async function get() {
    return new Promise(async function (resolve, reject) {
        try {
            // Search on database
            const dispositivos = await Dispositivo.find();

            resolve({
                data: dispositivos,
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function add(data) {
    return new Promise(async function (resolve, reject) {
        try {
            // Validations

            // Save on database
            const newDispositivo = new Dispositivo({
                nombre: data.nombre,
            });

            let res = await newDispositivo.save();

            resolve({
                ok: true,
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    get,
    add,
};
