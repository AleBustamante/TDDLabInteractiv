import { crearMetrica, agregarMetricaAProyecto } from "./moduloMetrica.js";

const metricaForm = document.querySelector("#metrica-form");
const botonRegresar = document.querySelector("#boton-regresar2");
const div = document.querySelector("#resultado-div");

let proyectoActual = JSON.parse(localStorage.getItem("proyectoActual")) || { metricas: [] };

metricaForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const pruebas = parseInt(metricaForm.querySelector("#pruebas").value);
    const lineas = parseInt(metricaForm.querySelector("#lineas").value);
    const cobertura = parseInt(metricaForm.querySelector("#cobertura").value);

    const metrica = crearMetrica(pruebas, lineas, cobertura);
    if (metrica !== null) {
        agregarMetricaAProyecto(metrica, proyectoActual);
        localStorage.setItem("proyectoActual", JSON.stringify(proyectoActual));
        div.innerHTML = "<p>Métrica creada correctamente.</p>";

        // Redirige a la página verMetricas.html para mostrar las métricas actualizadas
        window.location.href = `verMetricas.html?Titulo=${encodeURIComponent(proyectoActual.titulo)}&Proyecto=${encodeURIComponent(JSON.stringify(proyectoActual))}`;
    } else {
        div.innerHTML = "<p>Por favor, ingrese valores válidos para las métricas.</p>";
    }
});

botonRegresar.addEventListener("click", function() {
    window.location.href = "index.html";
});
