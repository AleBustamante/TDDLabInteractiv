import { crearMetrica, mostrarMetricas } from "./moduloMetrica.js";

const formularioMetrica = document.querySelector("#formulario-metrica");
const listaMetricas = document.querySelector("#lista-metricas");
const mensajeError = document.querySelector("#mensaje-error");

formularioMetrica.addEventListener("submit", (event) => {
    event.preventDefault();

    const pruebasAñadidas = parseInt(formularioMetrica.querySelector("#pruebas-anadidas").value);
    const lineasDeCodigo = parseInt(formularioMetrica.querySelector("#lineas-codigo").value);
    const cobertura = parseFloat(formularioMetrica.querySelector("#cobertura").value);

    if (isNaN(pruebasAñadidas) || isNaN(lineasDeCodigo) || isNaN(cobertura)) {
        mensajeError.textContent = "Por favor, complete todos los campos correctamente.";
    } else {
        mensajeError.textContent = "";

        const nuevaMetrica = crearMetrica(pruebasAñadidas, lineasDeCodigo, cobertura);

        mostrarMetricas(nuevaMetrica, listaMetricas); 
    }
});
