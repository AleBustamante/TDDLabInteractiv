import {datosFormulariosSonValidos,crearProyecto,agregarProyectoAProyectos} from "./moduloIndex.js";


const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const proyectosForm = document.querySelector("#proyectos-form");
const botonRegresar = document.querySelector("#boton-regresar");
const div=document.querySelector("#resultado-div")


proyectosForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const contenidoTitulo = titulo.value;
  const contenidoDescripcion = descripcion.value;
  if(datosFormulariosSonValidos(contenidoTitulo, contenidoDescripcion)==true)
  {
    
    let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    let nuevoProyecto = crearProyecto(contenidoTitulo, contenidoDescripcion);
    agregarProyectoAProyectos(nuevoProyecto, proyectos);
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    window.location.href = "index.html";
      
  }
  else{
    div.innerHTML = "<p>" + "Llene todos los campos" + "</p>";
  }
  
});
botonRegresar.addEventListener("click", function() {
  window.location.href = "index.html";
});