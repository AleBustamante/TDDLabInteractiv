import Metrica from "../Metrica.js";

const metricaForm = document.querySelector("#metrica-form");
const botonRegresar = document.querySelector("#boton-regresar2");
const div = document.querySelector("#resultado-div");

const parametros = new URLSearchParams(window.location.search);
const titulo = parametros.get("Titulo");
let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
const proyectoActual = proyectos.find(proyecto => titulo === proyecto.titulo);

metricaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const pruebas = parseInt(metricaForm.querySelector("#pruebas").value);
    const lineas = parseInt(metricaForm.querySelector("#lineas").value);
    const cobertura = parseInt(metricaForm.querySelector("#cobertura").value);
    const fecha = Date(metricaForm.querySelector("#fecha-hora").value);
    const complejidad = String(metricaForm.querySelector("#complejidad").value);


    const aux = new Metrica();
    //const metrica = aux.crearMetrica(pruebas, lineas, cobertura, fecha, complejidad);
    const metrica = new Metrica(pruebas, lineas, cobertura, fecha, complejidad);
    if (metrica !== null) {
        metrica.agregarMetricaAProyecto(metrica, proyectoActual);
        const index = proyectos.findIndex(proyecto => proyecto.titulo === proyectoActual.titulo);
        proyectos[index] = proyectoActual;

        localStorage.setItem("proyectos", JSON.stringify(proyectos));
        div.innerHTML = "<p>Métrica creada correctamente.</p>";
        window.location.href = `verMetricas.html?Titulo=${encodeURIComponent(proyectoActual.titulo)}&Proyecto=${encodeURIComponent(JSON.stringify(proyectoActual))}`;
    } else {
        div.innerHTML = "<p>Por favor, ingrese valores válidos para las métricas.</p>";
    }
});




botonRegresar.addEventListener("click", function () {
    window.location.href = "index.html";
});