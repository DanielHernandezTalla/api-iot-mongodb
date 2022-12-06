const Quality = require("./quality");
const Save = require("./saveData");

class Refrigerador {
    constructor(io) {
        this.io = io;
    }

    // refrigerador/temperatura
    temperatura(data) {
        let value = JSON.parse(data).value;
        Quality.temperatura(value);
        Save.temperatura(value.toString());
        this.io.emit("temperatura", value.toString());
    }

    // refrigerador/puerta/principal
    puertaPrincipal(data) {
        Save.puertaPrincipal(data.toString());
        this.io.emit("puertasprincipal", data.toString());
        this.aperturasDiario();
        this.aperturasSemanal();
    }

    // refrigerador/puerta/congelador
    puertaCongelador(data) {
        Save.puertaCongelador(data.toString());
        this.io.emit("puertascongelador", data.toString());
        this.aperturasDiario();
        this.aperturasSemanal();
    }

    // refrigerador/aperturas/diario
    async aperturasDiario() {
        let { aperturas } = await Save.getData();
        this.io.emit("aperturas", aperturas);
    }

    // refrigerador/aperturas/semanal
    async aperturasSemanal() {
        let { aperturasSemanal } = await Save.getData();
        this.io.emit("aperturassemanal", aperturasSemanal);
    }

    // refrigerador/capacidades/psuperior
    capacidadesPSuperior(data) {
        Quality.consumo(data, "puerta superior");
        Save.capacidadesPS(data.toString());
        this.io.emit("cappsuperior", data.toString());
    }

    // refrigerador/capacidades/pinferior
    capacidadesPInferior(data) {
        Quality.consumo(data, "puerta inferior");
        Save.capacidadesPI(data.toString());
        this.io.emit("cappinferior", data.toString());
    }

    // refrigerador/capacidades/plsuperior
    capacidadesPlSuperior(data) {
        Quality.consumo(data, "plataforma superior");
        Save.capacidadesPlS(data.toString());
        this.io.emit("capplsuperior", data.toString());
    }

    // refrigerador/capacidades/plmedia
    capacidadesPlMedia(data) {
        Quality.consumo(data, "plataforma media");
        Save.capacidadesPlM(data.toString());
        this.io.emit("capplmedia", data.toString());
    }

    // refrigerador/capacidades/plinferior
    capacidadesPlInferior(data) {
        Quality.consumo(data, "plataforma inferior");
        Save.capacidadesPlI(data.toString());
        this.io.emit("capplinferior", data.toString());
    }

    // refrigerador/capacidades/plverduras
    capacidadesPlVerduras(data) {
        Quality.consumo(data, "plataforma verdura");
        Save.capacidadesPlVerdura(data.toString());
        this.io.emit("capplverduras", data.toString());
    }
}

module.exports = Refrigerador;
