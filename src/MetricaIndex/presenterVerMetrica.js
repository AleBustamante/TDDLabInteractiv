import { mostrarMetricasProyecto, eliminarMetricaDeProyecto, actualizarProyectoEnArray, editarMetrica } from "./moduloMetrica.js";

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

    const botonRegresar = document.querySelector("#boton-regresar");
    botonRegresar.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    function agregarEventListeners() {
        const botonesEliminarMetrica = document.querySelectorAll(".eliminar-metrica");
        const botonesEditarMetrica = document.querySelectorAll(".editar-metrica");

        botonesEliminarMetrica.forEach(boton => {
            boton.addEventListener("click", function () {
                const confirmarEliminacion = confirm("¿Estás seguro de que deseas eliminar esta métrica?");
                if (confirmarEliminacion) {
                    const metricaIndex = parseInt(this.dataset.metricaIndex);
                    const metricaEliminada = proyecto.metricas[metricaIndex];
                    const eliminacionExitosa = eliminarMetricaDeProyecto(metricaEliminada, proyecto);

                    if (eliminacionExitosa) {
                        this.parentNode.remove();
                        localStorage.setItem("proyectoActual", JSON.stringify(proyecto));
                        actualizarProyectoEnArray(proyecto);
                        agregarEventListeners();
                    } else {
                        console.error("Error al eliminar la métrica del proyecto");
                    }
                }
            });
        });

        botonesEditarMetrica.forEach(boton => {
            boton.addEventListener("click", function () {
                const metricaIndex = parseInt(this.dataset.metricaIndex);
                const metricaAEditar = proyecto.metricas[metricaIndex];
                editarMetrica(metricaAEditar, proyecto);
                agregarEventListeners();
            });
        });
    }
    agregarEventListeners();
});
