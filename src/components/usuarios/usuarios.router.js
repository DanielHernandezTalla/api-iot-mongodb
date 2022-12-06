const express = require("express");
const router = express.Router();
const controller = require("./usuario.controller");

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
    controller
        .getById(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
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

router.put("/:id", (req, res) => {
    controller
        .update(req.params.id, req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete("/:id", (req, res) => {
    controller
        .del(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get("/changePassword/:id", (req, res) => {
    controller
        .changePassword(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
