"use strict";

// const { temperatura } = require("../providers/quality");

//#region Sockets
var socket = io.connect("http://localhost:3000", {
    forceNew: true,
});

// socket.on("message", function (data) {
//     console.log(data);
// });

socket.on("temperatura", function (data) {
    updateDashboard({ temperatura: data });
});

socket.on("puertasprincipal", function (data) {
    updateDashboard({ puertaPrincipal: data });
});

socket.on("puertascongelador", function (data) {
    updateDashboard({ puertaCongelador: data });
});

socket.on("aperturas", function (data) {
    updateDashboard({ aperturas: data });
});

socket.on("aperturassemanal", function (data) {
    updateDashboard({ aperturasSemanal: data });
});

socket.on("cappsuperior", function (data) {
    updateDashboard({ capacidadesPS: data });
});

socket.on("cappinferior", function (data) {
    updateDashboard({ capacidadesPI: data });
});

socket.on("capplsuperior", function (data) {
    updateDashboard({ capacidadesPlS: data });
});

socket.on("capplmedia", function (data) {
    updateDashboard({ capacidadesPlM: data });
});

socket.on("capplinferior", function (data) {
    updateDashboard({ capacidadesPlI: data });
});

socket.on("capplverduras", function (data) {
    updateDashboard({ capacidadesPlVerdura: data });
});

//#endregion

//#region api fetch
const fetchApi = async (url, data = null, data2 = null) => {
    try {
        if (data) url += "/" + data + "/" + data2;
        console.log(url);
        let res = await fetch(url);
        if (!res.ok) throw "Error al hacer la consulta";

        return await res.json();
    } catch (err) {
        console.warn("Error al hacer la consulta ", err);
        return err;
    }
};

//#endregion

//#region update data dashboard
const updateDashboard = (data) => {
    if (location.pathname !== "/") return;
    console.log(data);

    // Temperatura
    if (data.temperatura)
        document.getElementById("temperatura").textContent =
            data.temperatura + "°";

    // Puerta principal
    if (data.puertaPrincipal)
        document.getElementById("principal").textContent =
            data.puertaPrincipal == 1 ? "Abierta" : "Cerrada";

    // Puerta congelador
    if (data.puertaCongelador)
        document.getElementById("congelador").textContent =
            data.puertaCongelador == 1 ? "Abierta" : "Cerrada";

    // Aperturas
    if (data.aperturas)
        document.getElementById("aperturas").textContent = data.aperturas;

    // Aperturas semanal
    if (data.aperturasSemanal)
        document.getElementById("aperturasSemanal").textContent =
            data.aperturasSemanal;

    // Capacidad puerta superior
    if (data.capacidadesPS) {
        document.getElementById("pS").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPS;
        document.getElementById("pSP").textContent = data.capacidadesPS + "%";
    }

    // Capacidad puerta inferior
    if (data.capacidadesPI) {
        document.getElementById("pI").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPI;
        document.getElementById("pIP").textContent = data.capacidadesPI + "%";
    }

    // Capacidad plataforma superior
    if (data.capacidadesPlS) {
        document.getElementById("plS").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPlS;
        document.getElementById("plSP").textContent = data.capacidadesPlS + "%";
    }

    // Capacidad plataforma media
    if (data.capacidadesPlM) {
        document.getElementById("plM").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPlM;
        document.getElementById("plMP").textContent = data.capacidadesPlM + "%";
    }

    // Capacidad plataforma inferior
    if (data.capacidadesPlI) {
        document.getElementById("plI").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPlI;
        document.getElementById("plIP").textContent = data.capacidadesPlI + "%";
    }

    // Capacidad plataforma inferior
    if (data.capacidadesPlVerdura) {
        document.getElementById("plVerdura").style.strokeDashoffset =
            251 - (251 / 100) * data.capacidadesPlVerdura;
        document.getElementById("plVerduraP").textContent =
            data.capacidadesPlVerdura + "%";
    }
};

//#endregion

//#region notifications
const loadNotifications = (data) => {
    let $notifications = document.querySelector(".notifications");

    data.forEach((item) => {
        let fecha = item.fecha.toString().substring(0, 24);
        let notification = getNotification(item.tag, item.message, fecha);
        $notifications.innerHTML += notification;
    });
};

const getNotification = (tag, message, fecha) => {
    let data = `
        <div class="notification">
            <div>
                <h2>${tag}</h2>
                <span>${fecha}</span>
            </div>
            <p>
                ${message}
            </p>
        </div>
    `;
    return data;
};
//#endregion

//#region informe

const loadInforme = async () => {
    let res = await fetchApi("/informe", "1667286000000", "1670137200000");
    // console.log(res);

    // Creando la grafica
    let data = res.res.map((item) => {
        return { x: item.temperatura, y: item.aperturas, r: 2 };
    });

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: "bubble",
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: "Temperatura Aperturas",
                    data,
                    backgroundColor: "rgb(255, 99, 132)",
                },
            ],
        },
        options: {},
    });

    // Actualizando los datos
    document.getElementById("r2").textContent = res.R2.toFixed(2);
    document.getElementById("intersection").textContent =
        res.intercept.toFixed(2);
    document.getElementById("slope").textContent = res.slope.toFixed(2);
    document.getElementById("function").textContent = `
        ${res.intercept.toFixed(2)} + ${res.slope.toFixed(2)}x`;
};

//#endregion

document.addEventListener("DOMContentLoaded", async (e) => {
    // Iniciamos el serviceWorker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./sw.js")
            .then((reg) => {
                console.log("Registro del service worker exitoso", reg);
            })
            .catch((err) => {
                console.warn(
                    "Error al tratar de registrar el service worker",
                    err
                );
            });
    }

    if (location.pathname === "/") updateDashboard(await fetchApi("/data"));
    if (location.pathname === "/notifications.html")
        loadNotifications(await fetchApi("/notifications"));
    if (location.pathname === "/informes.html") loadInforme();
});

document.addEventListener("click", (e) => {
    if (!(e.target.matches(".menu") || e.target.matches(".menu *"))) {
        let menu = document.querySelector(".menu");
        menu.classList.remove("menu-visible");
    }
    if (
        e.target.matches(".menu-button") ||
        e.target.matches(".menu-button *")
    ) {
        let menu = document.querySelector(".menu");
        menu.classList.add("menu-visible");
    }
});
