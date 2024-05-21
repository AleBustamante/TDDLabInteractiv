import Metrica from "../Metrica.js";

function crearMetrica(pruebasAñadidas, lineasDeCodigo, cobertura, fechaHora, complejidad) {
    const cero = 0;
    const valorindefinido = undefined;
    const valornulo = null;
    const valorTope = 100;
    const fechaHoraRegex = /^\d{2}\/\d{2}\/\d{4}-\d{2}:\d{2}$/;

    if (pruebasAñadidas === valornulo || pruebasAñadidas === valorindefinido || pruebasAñadidas < cero) {
        pruebasAñadidas = cero;
    }
    if (lineasDeCodigo === valornulo || lineasDeCodigo === valorindefinido || lineasDeCodigo < cero) {
        lineasDeCodigo = cero;
    }
    if (cobertura === valornulo || cobertura === valorindefinido || cobertura < cero) {
        cobertura = cero;
    }
    if (pruebasAñadidas > valorTope || lineasDeCodigo > valorTope || cobertura > valorTope) {
        console.log("Ponga un valor real por favor");
        return null;
    }
    if (!fechaHoraRegex.test(fechaHora)) {
        console.log("Formato de fecha y hora no válido. Use el formato DD/MM/YYYY-HH:MM");
        return null;
    }
    if (typeof complejidad !== 'string') {
        console.log("La complejidad debe ser una cadena de caracteres.");
        return null;
    }

    return new Metrica(pruebasAñadidas, lineasDeCodigo, cobertura, fechaHora, complejidad);

}

function calcularPuntajePruebas(pruebasAñadidas) {
    if (pruebasAñadidas >= 1) {
        return 20
    } else {
        return 8;
    }
}

function calcularPuntajeLineas(lineasDeCodigo) {
    if (lineasDeCodigo <= 20) {
        return 20;
    } else if (lineasDeCodigo <= 40) {
        return 16;
    } else if (lineasDeCodigo <= 60) {
        return 12;
    } else {
        return 8;
    }
}

function calcularPuntajeCobertura(cobertura) {
    if (cobertura > 90) {
        return 20;
    } else if (cobertura > 80) {
        return 16;
    } else if (cobertura > 70) {
        return 12;
    } else {
        return 8;
    }
}

function calcularPuntajeComplejidad(complejidad) {
    const complejidadLower = complejidad.toLowerCase();

    if (complejidadLower === 'baja') {
        return 20;
    } else if (complejidadLower === 'moderada') {
        return 16;
    } else if (complejidadLower === 'alta') {
        return 12;
    } else if (complejidadLower === 'muy alta') {
        return 8;
    } else {
        return 0;
    }
}


function calcularDiferenciaFechasEnDias(fechaHoraAnterior, fechaHora) {
    const partesAnteriores = fechaHoraAnterior.split(/[\-:\s]/);
    const partesActuales = fechaHora.split(/[\-:\s]/);

    const diaAnterior = parseInt(partesAnteriores[0], 10);
    const mesAnterior = parseInt(partesAnteriores[1], 10) - 1; // Los meses en JavaScript son base 0 (enero es 0)
    const anioAnterior = parseInt(partesAnteriores[2], 10);
    const horaAnterior = parseInt(partesAnteriores[3], 10);
    const minutoAnterior = parseInt(partesAnteriores[4], 10);

    const diaActual = parseInt(partesActuales[0], 10);
    const mesActual = parseInt(partesActuales[1], 10) - 1;
    const anioActual = parseInt(partesActuales[2], 10);
    const horaActual = parseInt(partesActuales[3], 10);
    const minutoActual = parseInt(partesActuales[4], 10);

    const fechaAnterior = new Date(anioAnterior, mesAnterior, diaAnterior, horaAnterior, minutoAnterior);
    const fechaActual = new Date(anioActual, mesActual, diaActual, horaActual, minutoActual);

    const diferenciaEnMilisegundos = fechaActual - fechaAnterior;
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
    const diferenciaEnDias = diferenciaEnMilisegundos / milisegundosEnUnDia;

    return diferenciaEnDias;
}



function calcularPuntajeFrecuenciaCommits(fechaHora, metricas) {
    if (metricas.length === 0) {
        return 20;
    } else {
        const fechaHoraAnterior = metricas[metricas.length - 1].fechaHora;
        const diferenciaEnDias = calcularDiferenciaFechasEnDias(fechaHoraAnterior, fechaHora);
        if (diferenciaEnDias < 2) {
            return 20;
        } else if (diferenciaEnDias < 3) {
            return 16;
        } else if (diferenciaEnDias < 7) {
            return 12;
        } else {
            return 8;
        }
    }
}


function calcularPromedioPuntajeDePruebas(metricas) {
    let sumaPuntajes = 0;
    metricas.forEach(metrica => {
        sumaPuntajes += isNaN(metrica.pruebasAñadidas) || metrica.pruebasAñadidas < 0 ? 0 : calcularPuntajePruebas(metrica.pruebasAñadidas);
    });
    return sumaPuntajes / metricas.length;
}


function calcularPromedioPuntajeDeLineas(metricas) {
    let sumaPuntajes = 0;
    metricas.forEach(metrica => {
        sumaPuntajes += isNaN(metrica.lineasDeCodigo) || metrica.lineasDeCodigo < 0 ? 0 : calcularPuntajeLineas(metrica.lineasDeCodigo);
    });
    return sumaPuntajes / metricas.length;
}



function calcularPromedioPuntajeDeCobertura(metricas) {
    let sumaPuntajes = 0;
    metricas.forEach(metrica => {
        sumaPuntajes += isNaN(metrica.cobertura) || metrica.cobertura < 0 ? 0 : calcularPuntajeCobertura(metrica.cobertura);
    });
    return sumaPuntajes / metricas.length;
}


function calcularPromedioPuntajeDeComplejidad(metricas) {
    let sumaPuntajes = 0;
    metricas.forEach(metrica => {
        sumaPuntajes += calcularPuntajeComplejidad(metrica.complejidad);
    });
    return sumaPuntajes / metricas.length;
}

function calcularPromedioPuntajeDeFrecuencia(metricas) {
    if (metricas.length === 0) {
        return 0;
    } else {
        let sumaFrecuencias = 0;
        metricas.forEach(metrica => {
            sumaFrecuencias += isNaN(metrica.fechaHora) ? 0 : calcularPuntajeFrecuenciaCommits(metrica.fechaHora, metricas);
        });
        return sumaFrecuencias / metricas.length;
    }
}


function calcularPuntajeTotal(metricas) {
    const promedioPruebas = calcularPromedioPuntajeDePruebas(metricas);
    const promedioLineas = calcularPromedioPuntajeDeLineas(metricas);
    const promedioCobertura = calcularPromedioPuntajeDeCobertura(metricas);
    const promedioComplejidad = calcularPromedioPuntajeDeComplejidad(metricas);
    const promedioFrecuencia = calcularPromedioPuntajeDeFrecuencia(metricas);

    const sumaPromedios = promedioPruebas + promedioLineas + promedioCobertura + promedioComplejidad + promedioFrecuencia;

    return sumaPromedios;
}


function agregarMetricaAProyecto(metrica, proyecto) {
    if (!proyecto || !Array.isArray(proyecto.metricas)) {
        return "No se puede agregar una métrica a un proyecto no existente";
    } else {
        proyecto.metricas.push(metrica);
        return proyecto.metricas[proyecto.metricas.length - 1];
    }
}

function eliminarMetricaDeProyecto(metrica, proyecto) {
    if (!proyecto || !Array.isArray(proyecto.metricas)) {
        return "No se puede eliminar una métrica que no existe en el proyecto";
    } else {
        const indiceMetricaAEliminar = proyecto.metricas.indexOf(metrica);
        if (indiceMetricaAEliminar === -1) {
            return "No se puede eliminar una métrica que no existe en el proyecto";
        } else {
            proyecto.metricas.splice(indiceMetricaAEliminar, 1);
            return "Se eliminó la métrica del proyecto con éxito";
        }
    }
}

function actualizarProyectoEnArray(proyectoActualizado) {
    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const index = proyectos.findIndex(proyecto => proyecto.titulo === proyectoActualizado.titulo);
    if (index !== -1) {
        proyectos[index] = proyectoActualizado;
        localStorage.setItem("proyectos", JSON.stringify(proyectos));
    }
}

function obtenerDescripcionPromedio(puntaje) {
    if (puntaje > 16 && puntaje <= 20) {
        return "Excelente";
    } else if (puntaje >= 12 && puntaje <= 16) {
        return "Bueno";
    } else if (puntaje > 8 && puntaje <= 12) {
        return "Regular";
    } else {
        return "Deficiente";
    }
}

function generarMetricaHTML(metrica, index) {
    return `
        <div>
            <h3>Métrica ${index + 1}:</h3>
            <p>Cantidad de Pruebas: ${metrica.pruebasAñadidas} nuevas pruebas.</p>
            <p>Líneas de Código Modificadas: ${metrica.lineasDeCodigo} líneas.</p>
            <p>Cobertura de Pruebas: ${metrica.cobertura}%.</p>
            <p>Complejidad de Código: ${metrica.complejidad}.</p>
            <p>Frecuencia de Commits: ${metrica.fechaHora}.</p>
            <button class="eliminar-metrica" data-metrica-index="${index}">Eliminar Métrica</button>
        </div>
    `;
}

function generarPromedioHTML(promedioPruebas, promedioLineas, promedioCobertura, promedioFrecuencia, promedioComplejidad, puntajeTotal) {
    return `
        <div>
            <h3>Promedio de Puntajes Individuales:</h3>
            <p>Cantidad de Pruebas por Commit (20%): ${promedioPruebas} puntos (${obtenerDescripcionPromedio(promedioPruebas)})</p>
            <p>Líneas de Código por Commit (20%): ${promedioLineas} puntos (${obtenerDescripcionPromedio(promedioLineas)})</p>
            <p>Porcentaje de Cobertura de Pruebas por Commit (20%): ${promedioCobertura} puntos (${obtenerDescripcionPromedio(promedioCobertura)})</p>
            <p>Frecuencia de Commits (20%): ${promedioFrecuencia} puntos (${obtenerDescripcionPromedio(promedioFrecuencia)})</p>
            <p>Complejidad de Código (20%): ${promedioComplejidad} puntos (${obtenerDescripcionPromedio(promedioComplejidad)})</p>
        </div>
        <div>
            <h3>Puntaje Total:</h3>
            <p>${puntajeTotal} puntos</p>
        </div>
    `;
}

function mostrarMetricasProyecto(proyecto) {
    const metricasContainer = document.querySelector("#metricas-container");
    metricasContainer.innerHTML = "";

    proyecto.metricas.forEach((metrica, index) => {
        const metricaHTML = generarMetricaHTML(metrica, index);
        metricasContainer.innerHTML += metricaHTML;
    });

    if (proyecto.metricas.length > 0) {
        const promedioPruebas = calcularPromedioPuntajeDePruebas(proyecto.metricas);
        const promedioLineas = calcularPromedioPuntajeDeLineas(proyecto.metricas);
        const promedioCobertura = calcularPromedioPuntajeDeCobertura(proyecto.metricas);
        const promedioFrecuencia = calcularPromedioPuntajeDeFrecuencia(proyecto.metricas); 
        const promedioComplejidad = calcularPromedioPuntajeDeComplejidad(proyecto.metricas);

        const puntajeTotal = calcularPuntajeTotal(proyecto.metricas);

        const promedioHTML = generarPromedioHTML(promedioPruebas, promedioLineas, promedioCobertura, promedioFrecuencia, promedioComplejidad, puntajeTotal);
        metricasContainer.innerHTML += promedioHTML;
    }
}


function procesarArchivoDeMetricas(contenido, proyecto) {
    const lineas = contenido.split('\n');
    const metricas = [];
    
    lineas.forEach(linea => {
        if (linea.trim()) { 
            const [pruebas, lineas, cobertura, fechaHora, complejidad] = linea.split(',').map(value => value.trim());
            const metrica = {
                pruebasAñadidas: parseInt(pruebas, 10),
                lineasDeCodigo: parseInt(lineas, 10),
                cobertura: parseFloat(cobertura),
                fechaHora: fechaHora,
                complejidad: complejidad
            };
            metricas.push(metrica);
            agregarMetricaAProyecto(metrica, proyecto); // Agregar la métrica al proyecto actual
        }
    });

    return metricas;
}




export { crearMetrica, agregarMetricaAProyecto, eliminarMetricaDeProyecto, mostrarMetricasProyecto, actualizarProyectoEnArray, procesarArchivoDeMetricas, calcularPuntajePruebas, calcularPuntajeCobertura, calcularPuntajeComplejidad, calcularPuntajeLineas, calcularDiferenciaFechasEnDias, calcularPromedioPuntajeDePruebas, calcularPromedioPuntajeDeLineas, calcularPromedioPuntajeDeCobertura, calcularPromedioPuntajeDeComplejidad, calcularPromedioPuntajeDeFrecuencia, obtenerDescripcionPromedio};