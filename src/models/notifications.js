const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationsSchema = new Schema({
    tag: String,
    message: String,
    viewed: Boolean,
    fecha: String,
});

module.exports = mongoose.model("notifications", notificationsSchema);
