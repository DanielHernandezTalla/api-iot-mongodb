const express = require("express");
const router = express.Router();
const controller = require("./dispositivo.controller");

router.get("/", (req, res) => {
    controller
        .get(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/:id", (req, res) => {
    res.send(req.params);
});

router.post("/", (req, res) => {
    controller
        .add(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put("/", (req, res) => {
    res.send("sd");
});

router.delete("/", (req, res) => {
    res.send("sd");
});

module.exports = router;
