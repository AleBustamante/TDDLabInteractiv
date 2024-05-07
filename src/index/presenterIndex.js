import { crearProyecto, agregarProyectoAProyectos, mostrarProyectos, eliminarProyecto } from "./moduloIndex.js";


const botonAgregarProyecto = document.querySelector("#boton-agregar-proyecto");
let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];



mostrarProyectos(proyectos);
const proyectosContainer = document.createElement("div");
proyectos.forEach((proyecto) => {
  const proyectoElement = document.createElement("div");
  proyectoElement.innerHTML = `<h2>${proyecto.titulo}</h2><p>${proyecto.descripcion}</p>`;
  

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.addEventListener("click", () => {
    eliminarProyecto(proyecto,proyectos)
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    proyectoElement.remove();
  });
  proyectoElement.appendChild(deleteButton);
  
  const agregarMetricaButton = document.createElement("button");
  agregarMetricaButton.textContent = "Agregar Métrica";
  agregarMetricaButton.addEventListener("click", () => {
    const tituloProyecto = proyecto.titulo;
    const proyectoJSON = JSON.stringify(proyecto);
    const proyectoCodificado = encodeURIComponent(proyectoJSON);
    const url = `Metricas.html?Titulo=${encodeURIComponent(tituloProyecto)}&Proyecto=${proyectoCodificado}`;
    window.location.href = url;
  });
  proyectoElement.appendChild(agregarMetricaButton);
  
const mostrarMetricasButton = document.createElement("button");
mostrarMetricasButton.textContent = "Mostrar Métricas";

mostrarMetricasButton.addEventListener("click", () => {
    const tituloProyecto = proyecto.titulo;
    const proyectoJSON = JSON.stringify(proyecto);
    const proyectoCodificado = encodeURIComponent(proyectoJSON);
    const url = `verMetricas.html?Titulo=${encodeURIComponent(tituloProyecto)}&Proyecto=${proyectoCodificado}`;
    window.location.href = url;
});

proyectoElement.appendChild(mostrarMetricasButton);


  const metricasContainer = document.createElement("div");
  proyectoElement.appendChild(metricasContainer);
  
  proyectosContainer.appendChild(proyectoElement);
});
document.body.appendChild(proyectosContainer);

botonAgregarProyecto.addEventListener("click", function () {
  window.location.href = "formularioProyectos.html";
});
