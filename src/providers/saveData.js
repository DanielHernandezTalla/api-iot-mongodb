const RTemperatura = require("../models/rTemperatura");
const Rtemxapr = require("../models/temxapr");
const { RPuertaPrincipal, RPuertaCongelador } = require("../models/rPuertas");
const {
    RCapacidadesPS,
    RCapacidadesPI,
    RCapacidadesPlS,
    RCapacidadesPlM,
    RCapacidadesPlI,
    RCapacidadesPlVerdura,
} = require("../models/rCapacidades");
const Notifications = require("../models/notifications");
const SimpleLinearRegression = require("ml-regression-simple-linear");
const rTemperatura = require("../models/rTemperatura");

async function temperatura(data) {
    try {
        const newRTemperatura = new RTemperatura();
        newRTemperatura.data = data;
        newRTemperatura.fecha = new Date().getTime();

        await newRTemperatura.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function puertaPrincipal(data) {
    try {
        const newPuertaPrincipal = new RPuertaPrincipal();
        newPuertaPrincipal.data = data;
        newPuertaPrincipal.fecha = new Date().getTime;

        await newPuertaPrincipal.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function puertaCongelador(data) {
    try {
        const newPuerta = new RPuertaCongelador();
        newPuerta.data = data;
        newPuerta.fecha = new Date().getTime;

        await newPuerta.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPS(data) {
    try {
        const newCapacidad = new RCapacidadesPS();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPI(data) {
    try {
        const newCapacidad = new RCapacidadesPI();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPlS(data) {
    try {
        const newCapacidad = new RCapacidadesPlS();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPlM(data) {
    try {
        const newCapacidad = new RCapacidadesPlM();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPlI(data) {
    try {
        const newCapacidad = new RCapacidadesPlI();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function capacidadesPlVerdura(data) {
    try {
        const newCapacidad = new RCapacidadesPlVerdura();
        newCapacidad.data = data;
        newCapacidad.fecha = new Date().getTime;

        await newCapacidad.save();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getData() {
    const rT = await RTemperatura.find().sort({ $natural: -1 }).limit(1);
    const rPP = await RPuertaPrincipal.find().sort({ $natural: -1 }).limit(1);
    const rPC = await RPuertaCongelador.find().sort({ $natural: -1 }).limit(1);
    const rApp = await RPuertaPrincipal.find().count();
    const rApc = await RPuertaCongelador.find().count();
    const rCPS = await RCapacidadesPS.find().sort({ $natural: -1 }).limit(1);
    const rCPI = await RCapacidadesPI.find().sort({ $natural: -1 }).limit(1);
    const rCPlS = await RCapacidadesPlS.find().sort({ $natural: -1 }).limit(1);
    const rCPlM = await RCapacidadesPlM.find().sort({ $natural: -1 }).limit(1);
    const rCPlI = await RCapacidadesPlI.find().sort({ $natural: -1 }).limit(1);
    const rCPlVerdura = await RCapacidadesPlVerdura.find()
        .sort({ $natural: -1 })
        .limit(1);

    return {
        temperatura: rT[0].data,
        puertaPrincipal: rPP[0].data,
        puertaCongelador: rPC[0].data,
        aperturas: rApp + rApc,
        aperturasSemanal: rApp + rApc,
        capacidadesPS: rCPS[0].data,
        capacidadesPI: rCPI[0].data,
        capacidadesPlS: rCPlS[0].data,
        capacidadesPlM: rCPlM[0].data,
        capacidadesPlI: rCPlI[0].data,
        capacidadesPlVerdura: rCPlVerdura[0].data,
    };
}

async function getNotifications() {
    let data = await Notifications.find();
    return data;
}

async function temxapr(data) {
    try {
        data.forEach(async (item) => {
            console.log(item);
            const newtemxapr = new Rtemxapr();
            newtemxapr.temperatura = item.tem;
            newtemxapr.aperturas = item.aperturas;
            newtemxapr.fecha = item.date;

            await newtemxapr.save();
        });

        console.log("after");

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getTemXApr($data) {
    // console.log($data);
    try {
        const res = await Rtemxapr.find({
            fecha: {
                $gte: $data.gte,
                $lt: $data.lt,
            },
        });

        // console.log(res);
        // console.log(new Date("12/4/2022"));

        let x = [];
        let y = [];
        res.forEach((item) => {
            x.push(item.temperatura);
            y.push(item.aperturas);
        });

        const regression = new SimpleLinearRegression(x, y);

        // console.log("Intercept      " + regression.intercept);
        // console.log("Slope          " + regression.slope);
        // console.log("R2             " + regression.score(x, y).r2);
        // console.log(regression.toString());

        let data = {
            res,
            intercept: regression.intercept,
            slope: regression.slope,
            R2: regression.score(x, y).r2,
            function: regression.toString(),
        };

        return data;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    temperatura,
    puertaPrincipal,
    puertaCongelador,
    capacidadesPS,
    capacidadesPI,
    capacidadesPlS,
    capacidadesPlM,
    capacidadesPlI,
    capacidadesPlVerdura,
    getData,
    getNotifications,
    temxapr,
    getTemXApr,
};
