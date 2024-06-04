export default class Metrica {
    constructor(pruebasAñadidas, lineasDeCodigo, cobertura, fecha, complejidad, metricaAnterior = null) {
        this.pruebasAñadidas = pruebasAñadidas;
        this.lineasDeCodigo = lineasDeCodigo;
        this.cobertura = cobertura;
        this.fecha = fecha;
        this.complejidad = complejidad;
        this.frecuencia = null;
        this.hayPruebas = pruebasAñadidas >= 1 ? true : false;
        this.calcularPuntajeFrecuencia(metricaAnterior);
    }
    crearMetrica(pruebasAñadidas, lineasDeCodigo, cobertura, complejidad) {
        const cero = 0;
        const valorindefinido = undefined;
        const valornulo = null;
        const valorTope = 100;

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


        const puntajePruebas = this.calcularPuntajePruebas(pruebasAñadidas);
        const puntajeLineas = this.calcularPuntajeLineas(lineasDeCodigo);
        const puntajeCobertura = this.calcularPuntajeCobertura(cobertura);
        const puntajeComplejidad = this.calcularPuntajeComplejidad(complejidad);
        const puntajeTotal = puntajePruebas + puntajeLineas + puntajeCobertura;

        const descripcionPruebas = this.obtenerDescripcionPruebas(puntajePruebas);
        const descripcionLineas = this.obtenerDescripcionLineas(puntajeLineas);
        const descripcionCobertura = this.obtenerDescripcionCobertura(puntajeCobertura);


        const descripcionTotal = this.obtenerDescripcionTotal(puntajeTotal);

        return new Metrica(pruebasAñadidas, lineasDeCodigo, cobertura, complejidad, puntajeTotal, descripcionPruebas, descripcionLineas, descripcionCobertura, descripcionTotal, puntajeComplejidad);

    }

    calcularPuntajePruebas(pruebasAñadidas) {
        if (pruebasAñadidas >= 1) {
            return 20
        } else {
            return 8;
        }
    }

    calcularPromedioPuntajeDePruebas(metricas) {
        let porcentajeConPrueba = 0;
        let commitsConPrueba = 0;
        metricas.forEach(metrica => {
            commitsConPrueba += metrica.hayPruebas === true ? 1 : 0;
        });
        porcentajeConPrueba = commitsConPrueba * 100 / metricas.length;
        if (porcentajeConPrueba === 100) {
            return 20;
        } else if (porcentajeConPrueba >= 80) {
            return 16;
        } else if (porcentajeConPrueba >= 60) {
            return 12;
        } else {
            return 8;
        }
    }


    calcularPuntajeLineas(lineasDeCodigo) {
        const puntaje20 = 20;
        const puntaje16 = 16;
        const puntaje12 = 12;
        const puntaje8 = 8;
        if (lineasDeCodigo <= 20) {
            return puntaje20;
        } else if (lineasDeCodigo <= 40) {
            return puntaje16;
        } else if (lineasDeCodigo <= 60) {
            return puntaje12;
        } else {
            return puntaje8;
        }
    }


    calcularPromedioPuntajeDeLineas(metricas) {
        const cero = 0;
        if (metricas.length === cero) {
            return cero;
        }
        let sumaPuntajes = cero;
        metricas.forEach(metrica => {
            sumaPuntajes += isNaN(metrica.lineasDeCodigo) || metrica.lineasDeCodigo < cero ? cero : this.calcularPuntajeLineas(metrica.lineasDeCodigo);
        });
        return sumaPuntajes / metricas.length;
    }

    calcularPuntajeCobertura(cobertura) {
        const puntaje20 = 20;
        const puntaje16 = 16;
        const puntaje12 = 12;
        const puntaje8 = 8;
        if (cobertura >= 90) {
            return puntaje20;
        } else if (cobertura >= 80) {
            return puntaje16;
        } else if (cobertura >= 70) {
            return puntaje12;
        } else {
            return puntaje8;
        }
    }

    calcularPromedioPuntajeDeCobertura(metricas) {
        const cero = 0;
        if (metricas.length === cero) {
            return cero;
        }
        let sumaPuntajes = 0;
        metricas.forEach(metrica => {
            sumaPuntajes += isNaN(metrica.cobertura) || metrica.cobertura < cero ? cero : this.calcularPuntajeCobertura(metrica.cobertura);
        });
        return sumaPuntajes / metricas.length;
    }

    calcularPuntajeComplejidad(complejidad) {
        let puntajeComplejidad = 8;

        if (typeof complejidad === 'string') {
            const complejidadLower = complejidad.toLowerCase();

            if (complejidadLower === "deficiente") {
                puntajeComplejidad = 8;
            } else if (complejidadLower === "regular") {
                puntajeComplejidad = 12;
            } else if (complejidadLower === "bueno") {
                puntajeComplejidad = 16;
            } else if (complejidadLower === "excelente") {
                puntajeComplejidad = 20;
            }
        }

        return puntajeComplejidad;
    }

    calcularPromedioPuntajeComplejidad(metricas) {
        let sumaPuntajes = 0;
        let cantidadMétricasValidas = 0;

        metricas.forEach(metrica => {
            const puntaje = this.calcularPuntajeComplejidad(metrica.complejidad);

            if (!isNaN(puntaje)) {
                sumaPuntajes += puntaje;
                cantidadMétricasValidas++;
            }
        });

        if (cantidadMétricasValidas === 0) {
            return 8;
        }

        return sumaPuntajes / cantidadMétricasValidas;
    }


    calcularPuntajeFrecuencia(metricaPrevia) {
        if (metricaPrevia === undefined || metricaPrevia === null) {
            this.frecuencia = "Excelente";
            return 20;
        }
        const milisegundosEnDia = 86400000;
        const fecha1 = new Date(metricaPrevia.fecha);
        const fecha2 = new Date(this.fecha);
        const tiempoTranscurrido = fecha2 - fecha1;
        if (tiempoTranscurrido < milisegundosEnDia * 2) {
            this.frecuencia = "Excelente";
            return 20;
        }
        if (tiempoTranscurrido < milisegundosEnDia * 3) {
            this.frecuencia = "Bueno";
            return 16;
        }
        if (tiempoTranscurrido < milisegundosEnDia * 4) {
            this.frecuencia = "Regular";
            return 12;
        }
        this.frecuencia = "Deficiente";
        return 8;
    }

    calcularPromedioPuntajeDeFrecuencia(metricas) {
        const cero = 0;
        if (metricas.length === cero) {
            return cero;
        }  let sumaFrecuencias = cero;
        metricas.forEach(metrica => {
            switch (metrica.frecuencia) {
                case "Excelente":
                    sumaFrecuencias += 20;
                    break;
                case "Bueno":
                    sumaFrecuencias += 16;
                    break;
                case "Regular":
                    sumaFrecuencias += 12;
                    break;
                case "Deficiente":
                    sumaFrecuencias += 8;
                    break;
            }
        });
        return sumaFrecuencias / metricas.length;
    }

    calcularPuntajeTotal(metricas) {
        const promedioPruebas = this.calcularPromedioPuntajeDePruebas(metricas);
        const promedioLineas = this.calcularPromedioPuntajeDeLineas(metricas);
        const promedioCobertura = this.calcularPromedioPuntajeDeCobertura(metricas);
        const promedioComplejidad = this.calcularPromedioPuntajeComplejidad(metricas);
        const promedioFrecuencia = this.calcularPromedioPuntajeDeFrecuencia(metricas);
    
        const sumaPromedios = promedioPruebas + promedioLineas + promedioCobertura + promedioComplejidad + promedioFrecuencia;
    
        return sumaPromedios;
    }

    obtenerDescripcionPruebas(puntajePruebas) {
        if (puntajePruebas >= 9) {
            return "Excelente: Se han realizado suficientes pruebas para garantizar la calidad del código.";
        } else if (puntajePruebas >= 7) {
            return "Bueno: Se han realizado pruebas adecuadas, pero pueden ser mejoradas para una cobertura más completa.";
        } else {
            return "Insuficiente: La cantidad de pruebas realizadas es baja, lo que puede afectar la calidad del código.";
        }
    }

    obtenerDescripcionLineas(puntajeLineas) {
        if (puntajeLineas >= 9) {
            return "Excelente: El tamaño del código es óptimo, lo que facilita su mantenimiento y comprensión.";
        } else if (puntajeLineas >= 7) {
            return "Bueno: El tamaño del código es adecuado, aunque se pueden hacer mejoras para reducir la complejidad.";
        } else {
            return "Demasiado grande: El código es demasiado extenso, lo que puede dificultar su mantenimiento y comprensión.";
        }
    }

    obtenerDescripcionFrecuencia(puntajeFrecuencia) {
        switch (puntajeFrecuencia) {
            case 20:
                return "Excelente: los commits se han realizado de forma muy incremental en el tiempo"
            case 16:
                return "Bueno: los commits se han realizado de forma suficientemente incremental en el tiempo"
            case 12:
                return "Regular: los commits se han realizado de forma incremental, pero se puede mejorar"
            case 8:
                return "Deficiente: los commits no se han realizado de forma incremental"
        }
    }
    obtenerDescripcionCobertura(puntaje) {
        if (puntaje > 16 && puntaje <= 20) {
            return "Excelente: La cobertura de pruebas es muy alta, lo que garantiza una amplia protección contra errores.";
        } else if (puntaje >= 12 && puntaje <= 16) {
            return "Bueno: La cobertura de pruebas es adecuada, aunque pueden existir áreas que necesiten más pruebas.";
        } else if (puntaje > 8 && puntaje <= 12) {
            return "Regular: La cobertura no es la ideal, podría mejorarse bastante.";
        } else {
            return "Deficiente: La cobertura de pruebas es baja, lo que deja áreas críticas sin suficiente protección.";
        }
    }

    obtenerDescripcionTotal(puntajeTotal) {
        if (puntajeTotal >= 25) {
            return "Excelente, el proyecto tiene un alto nivel de calidad.";
        } else if (puntajeTotal >= 20) {
            return "Buen trabajo, el proyecto tiene un nivel aceptable de calidad.";
        } else if (puntajeTotal >= 15) {
            return "El proyecto necesita mejoras para alcanzar un nivel adecuado de calidad.";
        } else {
            return "Se requieren mejoras significativas, el proyecto tiene un bajo nivel de calidad.";
        }
    }

    agregarMetricaAProyecto(metrica, proyecto) {
        if (!proyecto || !Array.isArray(proyecto.metricas)) {
            return "No se puede agregar una métrica a un proyecto no existente";
        } else {
            proyecto.metricas.push(metrica);
            return proyecto.metricas[proyecto.metricas.length - 1];
        }
    }

    eliminarMetricaDeProyecto(metrica, proyecto) {
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

    actualizarProyectoEnArray(proyectoActualizado) {
        const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
        const index = proyectos.findIndex(proyecto => proyecto.titulo === proyectoActualizado.titulo);
        if (index !== -1) {
            proyectos[index] = proyectoActualizado;
            localStorage.setItem("proyectos", JSON.stringify(proyectos));
        }
    }

    procesarArchivoDeMetricas(contenido, proyecto) {
        const lineas = contenido.split('\n');
        const metricas = [];

        lineas.forEach(linea => {
            if (linea.trim()) {
                const [pruebas, lineas, cobertura, fechaHora, complejidad] = linea.split(',').map(value => value.trim());
                const metrica = new Metrica(
                    parseInt(pruebas),
                    parseInt(lineas),
                    parseFloat(cobertura),
                    new Date(fechaHora),
                    complejidad
                );
                metricas.push(metrica);
                this.agregarMetricaAProyecto(metrica, proyecto);
            }
        });

        return metricas;
    }

    obtenerDescripcionPromedio(puntaje) {
        const numero20 = 20;
        const numero12 = 12;
        const numero16 = 16;
        const numero8 = 8;

        if (puntaje > numero16 && puntaje <= numero20) {
            return "Excelente";
        } else if (puntaje >= numero12 && puntaje <= numero16) {
            return "Bueno";
        } else if (puntaje > numero8 && puntaje <= numero12) {
            return "Regular";
        } else {
            return "Deficiente";
        }
    }


    generarMetricaHTML(metrica, index) {
        return `
            <div>
                <h3>Métrica ${index + 1}:</h3>
                <p>Cantidad de Pruebas: ${metrica.pruebasAñadidas} nuevas pruebas.</p>
                <p>Líneas de Código Modificadas: ${metrica.lineasDeCodigo} líneas.</p>
                <p>Cobertura de Pruebas: ${metrica.cobertura}%.</p>
                <p>Complejidad de Código: ${metrica.complejidad}.</p>
                <p>Frecuencia de Commits: ${metrica.frecuencia}.</p>
                <button class="eliminar-metrica" data-metrica-index="${index}">Eliminar Métrica</button>
                <button class="editar-metrica" data-metrica-index="${index}">Editar Métrica</button>
    
            </div>
        `;
    }
    
    generarPromedioHTML(promedioPruebas, promedioLineas, promedioCobertura, promedioFrecuencia, promedioComplejidad, puntajeTotal) {
        return `
            <div>
                <h3>Promedio de Puntajes Individuales:</h3>
                <p>Cantidad de Pruebas por Commit (20%): ${promedioPruebas} puntos (${this.obtenerDescripcionPromedio(promedioPruebas)})</p>
                <p>Líneas de Código por Commit (20%): ${promedioLineas} puntos (${this.obtenerDescripcionPromedio(promedioLineas)})</p>
                <p>Porcentaje de Cobertura de Pruebas por Commit (20%): ${promedioCobertura} puntos (${this.obtenerDescripcionPromedio(promedioCobertura)})</p>
                <p>Frecuencia de Commits (20%): ${promedioFrecuencia} puntos (${this.obtenerDescripcionPromedio(promedioFrecuencia)})</p>
                <p>Complejidad de Código (20%): ${promedioComplejidad} puntos (${this.obtenerDescripcionPromedio(promedioComplejidad)})</p>
            </div>
            <div>
                <h3>Puntaje Total:</h3>
                <p>${puntajeTotal} puntos</p>
            </div>
        `;
    }
    
    mostrarMetricasProyecto(proyecto) {
        const metricasContainer = document.querySelector("#metricas-container");
        metricasContainer.innerHTML = "";
    
        proyecto.metricas.forEach((metrica, index) => {
            const metricaHTML = this.generarMetricaHTML(metrica, index);
            metricasContainer.innerHTML += metricaHTML;
        });
    
        if (proyecto.metricas.length > 0) {
            const promedioPruebas = this.calcularPromedioPuntajeDePruebas(proyecto.metricas);
            const promedioLineas = this.calcularPromedioPuntajeDeLineas(proyecto.metricas);
            const promedioCobertura = this.calcularPromedioPuntajeDeCobertura(proyecto.metricas);
            const promedioFrecuencia = this.calcularPromedioPuntajeDeFrecuencia(proyecto.metricas); 
            const promedioComplejidad = this.calcularPromedioPuntajeComplejidad(proyecto.metricas);
    
            const puntajeTotal = this.calcularPuntajeTotal(proyecto.metricas);
    
            const promedioHTML = this.generarPromedioHTML(promedioPruebas, promedioLineas, promedioCobertura, promedioFrecuencia, promedioComplejidad, puntajeTotal);
            metricasContainer.innerHTML += promedioHTML;
        }
    }
    confirmarEliminarMetrica() {
        return confirm("Estas seguro de eliminar esta metrica?");
    }
    
}
