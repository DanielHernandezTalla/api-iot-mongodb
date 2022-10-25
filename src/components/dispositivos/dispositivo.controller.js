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

async function getById(id) {
    return new Promise(async function (resolve, reject) {
        try {
            // Search on database
            const dispositivo = await Dispositivo.find({ _id: id });

            resolve({
                data: dispositivo,
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

async function update(id, data) {
    return new Promise(async function (resolve, reject) {
        try {
            const dispositivo = await Dispositivo.find({ _id: id });

            let newDispositivo = {
                _id: dispositivo[0]._id,
                nombre: dispositivo[0].nombre,
                __v: dispositivo[0].__v,
                ...data,
            };

            await Dispositivo.updateOne(
                { _id: id },
                { $set: { nombre: data.nombre } }
            );

            resolve({
                ok: true,
            });
        } catch (e) {
            reject(e);
        }
    });
}

async function del(id, data) {
    return new Promise(async function (resolve, reject) {
        try {
            await Dispositivo.deleteOne({ _id: id });

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
    getById,
    add,
    update,
    del,
};
