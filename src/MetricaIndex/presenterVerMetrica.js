import { mostrarMetricasProyecto, eliminarMetricaDeProyecto } from "./moduloMetrica.js";


document.addEventListener("DOMContentLoaded", () => {
    const metricasContainer = document.getElementById("metricas-container");
    const parametros = new URLSearchParams(window.location.search);
    const tituloProyecto = parametros.get("Titulo");
    const proyectoCodificado = parametros.get("Proyecto");

    const proyecto = JSON.parse(decodeURIComponent(proyectoCodificado));

    const tituloProyectoElement = document.createElement("h2");
    tituloProyectoElement.textContent = `Título del Proyecto: ${tituloProyecto}`;
    metricasContainer.appendChild(tituloProyectoElement);

    mostrarMetricasProyecto(proyecto);
    

    const botonesEliminarMetrica = document.querySelectorAll(".eliminar-metrica");
    botonesEliminarMetrica.forEach(boton => {
    boton.addEventListener("click", function() {
        const metricaIndex = parseInt(this.dataset.metricaIndex);
        const metricaEliminada = proyecto.metricas[metricaIndex];
        const eliminacionExitosa = eliminarMetricaDeProyecto(metricaEliminada, proyecto);
        if (eliminacionExitosa) {
            this.parentNode.remove();
            localStorage.setItem("proyectoActual", JSON.stringify(proyecto));
        } else {
            console.error("Error al eliminar la metrica del proyecto");
        }
    });
});

     const botonRegresar = document.querySelector("#boton-regresar");
     botonRegresar.addEventListener("click", function() {
         window.location.href = "index.html";
     });
});
