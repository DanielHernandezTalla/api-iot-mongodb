// TODO: Implementación  de componente de aseguramiento de calidad.
const Notifications = require("../models/notifications");
const { transporter } = require("./mailer");

const temperatura = async (data) => {
    if (parseInt(data.toString()) > 16) {
        console.warn("Temperatura fuera del lugar");
        // Enviamos el correo al tener temperaturas altas
        await transporter.sendMail({
            from: "Temperatura fuera del lugar <hernandezdany41@gmail.com>",
            to: "daniel.hernandez216655@potros.itson.edu.mx",
            subject: "Temperatura fuera del lugar 💀",
            text: "Estimado usuario la temperatura de su refrigerador esta fuera de rango, favor de revisar su refrigerador.",
        });

        saveNotification(
            "Temperatura",
            "Estimado usuario la temperatura de su refrigerador esta fuera de rango. Temperatura " +
                data.toString() +
                "°c "
        );
    }
};

const consumo = async (data, item) => {
    if (parseInt(data.toString()) == 0) {
        console.warn("Falta de suministro 0%");
        // Enviamos el correo al tener un suministro finalizado
        await transporter.sendMail({
            from: "Suministro de 0% en el refrigerador <hernandezdany41@gmail.com>",
            to: "daniel.hernandez216655@potros.itson.edu.mx",
            subject: "El suministro en " + item + " es de 0% 💀",
            text: "Estimado usuario favor de suministrar mas alimentos en el refrigerador. Suministro en 0%.",
        });
        saveNotification(
            "Suministro",
            "Estimado usuario el suministro de " + item + " esta en un 0%"
        );
        return;
    }

    if (parseInt(data.toString()) <= 10) {
        console.warn("Falta de suministro");
        // Enviamos el correo al tener poco suministro
        await transporter.sendMail({
            from: "Suministro en el refrigerador <hernandezdany41@gmail.com>",
            to: "daniel.hernandez216655@potros.itson.edu.mx",
            subject: "El suministro en " + item + " es bajo 💀",
            text: "Estimado usuario favor de revisar el suministro de alimentos en el refrigerador, ya que ha sobrepasado el limite.",
        });
        saveNotification(
            "Suministro",
            "Estimado usuario el suministro de " + item + " es bajo."
        );
    }
};

const saveNotification = (tag, message) => {
    let newNotifications = new Notifications();
    newNotifications.tag = tag;
    newNotifications.message = message;
    newNotifications.viewed = false;
    newNotifications.fecha = new Date();

    newNotifications.save();
};

module.exports = { temperatura, consumo };
