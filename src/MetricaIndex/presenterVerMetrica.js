import Metrica from "../Metrica.js"; 


document.addEventListener("DOMContentLoaded", () => {
    const metricasContainer = document.getElementById("metricas-container");
    const parametros = new URLSearchParams(window.location.search);
    const tituloProyecto = parametros.get("Titulo");
    const proyectoCodificado = parametros.get("Proyecto");

    const proyecto = JSON.parse(decodeURIComponent(proyectoCodificado));

    const tituloProyectoElement = document.createElement("h2");
    tituloProyectoElement.textContent = `Título del Proyecto: ${tituloProyecto}`;
    metricasContainer.appendChild(tituloProyectoElement);

    const metrica = new Metrica(proyecto.metricas[0].pruebasAñadidas, proyecto.metricas[0].lineasDeCodigo, proyecto.metricas[0].cobertura, proyecto.metricas[0].fecha, proyecto.metricas[0].complejidad);
    metrica.mostrarMetricasProyecto(proyecto);
    

    const botonesEliminarMetrica = document.querySelectorAll(".eliminar-metrica");
    botonesEliminarMetrica.forEach(boton => {
    boton.addEventListener("click", function() {
        if(metrica.confirmarEliminarMetrica())
            {
                const metricaIndex = parseInt(this.dataset.metricaIndex);
                const metricaEliminada = proyecto.metricas[metricaIndex];
                const eliminacionExitosa = metrica.eliminarMetricaDeProyecto(metricaEliminada, proyecto);
                
                if (eliminacionExitosa) {
                    this.parentNode.remove();
                    localStorage.setItem("proyectoActual", JSON.stringify(proyecto));
                    metrica.actualizarProyectoEnArray(proyecto);
                } else {
                    console.error("Error al eliminar la métrica del proyecto");
                }
            }

    });
    });

});

const botonRegresar = document.querySelector("#boton-regresar");
    botonRegresar.addEventListener("click", function () {
        window.location.href = "Metricas.html";
    });
