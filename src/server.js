const express = require("express");
const cors = require("cors");
const http = require("http");
const mqtt = require("mqtt");
const path = require("path");
const Refrigerador = require("./providers/refrigerador");
const Save = require("./providers/saveData");

// Initialization
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const client = mqtt.connect(process.env.MQTT_BROKER);
const Refri = new Refrigerador(io);

// Settings
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(express.json());
// app.use(
//     cors({
//         origin: "https://www.section.io",
//     })
// );
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/data", async (req, res) => {
    res.send(await Save.getData());
});

app.get("/notifications", async (req, res) => {
    res.send(await Save.getNotifications());
});

app.get("/informe/:gte/:lt", async (req, res) => {
    // let data = [
    //     { tem: 15.39, aperturas: 20, date: new Date("11/19/2022").getTime() },
    //     { tem: 15.55, aperturas: 21, date: new Date("11/18/2022").getTime() },
    //     { tem: 14.26, aperturas: 18, date: new Date("11/17/2022").getTime() },
    //     { tem: 13.14, aperturas: 16, date: new Date("11/16/2022").getTime() },
    //     { tem: 11.55, aperturas: 13, date: new Date("11/15/2022").getTime() },
    //     { tem: 11.18, aperturas: 14, date: new Date("11/14/2022").getTime() },
    //     { tem: 10.12, aperturas: 12, date: new Date("11/13/2022").getTime() },
    //     { tem: 10.2, aperturas: 10, date: new Date("11/12/2022").getTime() },
    //     { tem: 10.42, aperturas: 10, date: new Date("11/11/2022").getTime() },
    //     { tem: 9.91, aperturas: 9, date: new Date("11/10/2022").getTime() },
    //     { tem: 11.18, aperturas: 15, date: new Date("11/9/2022").getTime() },
    //     { tem: 7.16, aperturas: 9, date: new Date("11/8/2022").getTime() },
    //     { tem: 6.11, aperturas: 8, date: new Date("11/7/2022").getTime() },
    //     { tem: 6.79, aperturas: 8, date: new Date("11/6/2022").getTime() },
    //     { tem: 7.26, aperturas: 9, date: new Date("11/5/2022").getTime() },
    //     { tem: 7.8, aperturas: 9, date: new Date("11/4/2022").getTime() },
    //     { tem: 9.87, aperturas: 11, date: new Date("11/3/2022").getTime() },
    //     { tem: 12.22, aperturas: 14, date: new Date("11/2/2022").getTime() },
    //     { tem: 15.09, aperturas: 20, date: new Date("11/1/2022").getTime() },
    // ];

    // res.send(await Save.temxapr(data));
    // console.log("req.params");
    // console.log(req.params.gte);
    // console.log(req.params.lt);
    res.send(await Save.getTemXApr({ gte: req.params.gte, lt: req.params.lt }));
});

app.post("/rTemperatura", async (req, res) => {
    let result = await Save.capacidadesPlVerdura(43);

    res.send({ ok: result });
});

const router = require("./routes/router.js");
router(app);

//#region WebSocket
io.on("connection", async (socket) => {
    console.log("New client connected");
    socket.emit("message", "Bienvenido");
});

//#endregion WebSocket

//#region TODO: Mecanismo de recepcion MQTT
client.on("connect", () => {
    console.log("MQTT connected");
    client.subscribe("refrigerador/#", (err) => {
        if (err) console.error("Error al conectar con el broker mqtt", err);
    });
});

client.on("message", (topic, message) => {
    // Recibiendo mensajes del broker
    console.log(topic, " - ", message.toString());

    switch (topic) {
        case "refrigerador/temperatura":
            Refri.temperatura(message);
            break;
        case "refrigerador/puerta/principal":
            Refri.puertaPrincipal(message);
            break;
        case "refrigerador/puerta/congelador":
            Refri.puertaCongelador(message);
            break;
        case "refrigerador/aperturas/diario":
            Refri.aperturasDiario();
            break;
        case "refrigerador/aperturas/semanal":
            Refri.aperturasSemanal();
            break;
        case "refrigerador/capacidades/psuperior":
            Refri.capacidadesPSuperior(message);
            break;
        case "refrigerador/capacidades/pinferior":
            Refri.capacidadesPInferior(message);
            break;
        case "refrigerador/capacidades/plsuperior":
            Refri.capacidadesPlSuperior(message);
            break;
        case "refrigerador/capacidades/plmedia":
            Refri.capacidadesPlMedia(message);
            break;
        case "refrigerador/capacidades/plinferior":
            Refri.capacidadesPlInferior(message);
            break;
        case "refrigerador/capacidades/plverduras":
            Refri.capacidadesPlVerduras(message);
            break;
        default:
            break;
    }

    // client.end();
});

// publicar al broker MQTT
// client.publish('presence', 'Hello mqtt')

//#endregion

module.exports = { server, app };
