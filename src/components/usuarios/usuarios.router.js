const express = require("express");
const usuarios = require("./usuario.controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.send(usuarios.getUsuarios());
});

module.exports = router;
