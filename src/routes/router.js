const usuarios = require("../components/usuarios/usuarios.router");
const dispositivos = require("../components/dispositivos/dispositivo.router");

function router(app) {
    app.use("/usuarios", usuarios);
    app.use("/dispositivos", dispositivos);
}

module.exports = router;
