export default class Metrica {
    constructor(pruebasAñadidas, lineasDeCodigo, cobertura, fecha, complejidad) {
        this.pruebasAñadidas = pruebasAñadidas;
        this.lineasDeCodigo = lineasDeCodigo;
        this.cobertura = cobertura;
        this.fecha = fecha;
        this.complejidad = complejidad;
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
        if (pruebasAñadidas <= 10) {
            return 10;
        } else if (pruebasAñadidas <= 20) {
            return 8;
        } else {
            return 5;
        }
    }

    calcularPromedioPuntajeDePrueba(metricas) {
        const cero = 0;
        if (metricas.length === cero) {
            return cero;
        }
        let sumaMetricasConPrueba = cero;
        metricas.forEach(metrica => {
            sumaMetricasConPrueba += isNaN(metrica.pruebasAñadidas) || metrica.pruebasAñadidas < cero ? cero : metrica.pruebasAñadidas;
        });
        let porcentajeMetricaConPrueba = sumaMetricasConPrueba / metricas.length;
        if (porcentajeMetricaConPrueba == 1) {
            return 20;
        } else if (porcentajeMetricaConPrueba < 1 && porcentajeMetricaConPrueba >= 0.8) {
            return 16;
        } else if (porcentajeMetricaConPrueba < 0.8 && porcentajeMetricaConPrueba >= 0.6) {
            return 12;
        } else if (porcentajeMetricaConPrueba < 0.6 && porcentajeMetricaConPrueba >= 0) {
            return 8;
        } else {
            return 0;
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

    calcularPuntajeFrecuencia(metricaPrevia) {
        if (metricaPrevia === undefined || metricaPrevia === null) {
            return 20;
        }
        const milisegundosEnDia = 86400000;
        const fecha1 = new Date(metricaPrevia.fecha);
        const fecha2 = new Date(this.fecha);
        const tiempoTranscurrido = fecha2 - fecha1;
        if (tiempoTranscurrido < milisegundosEnDia * 2) {
            return 20;
        }
        if (tiempoTranscurrido < milisegundosEnDia * 3) {
            return 16;
        }
        if (tiempoTranscurrido < milisegundosEnDia * 4) {
            return 12;
        }
        return 8;
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
    
    


    mostrarMetricasProyecto(proyecto) {
        const metricasContainer = document.querySelector("#metricas-container");
        metricasContainer.innerHTML = "";

        let metricaAnterior = null;
        proyecto.metricas.forEach((metrica, index) => {
            this.fecha = metrica.fecha;
            const puntajePruebas = this.calcularPuntajePruebas(metrica.pruebasAñadidas);
            const puntajeLineas = this.calcularPuntajeLineas(metrica.lineasDeCodigo);
            const puntajeCobertura = this.calcularPuntajeCobertura(metrica.cobertura);
            const puntajeComplejidad = this.calcularPuntajeComplejidad(metrica.complejidad);
            const puntajeFrecuencia = this.calcularPuntajeFrecuencia(metricaAnterior);
            const puntajeTotal = puntajePruebas + puntajeLineas + puntajeCobertura;

            const descripcionPruebas = this.obtenerDescripcionPruebas(puntajePruebas);
            const descripcionLineas = this.obtenerDescripcionLineas(puntajeLineas);
            const descripcionCobertura = this.obtenerDescripcionCobertura(puntajeCobertura);
            const descripcionFrecuencia = this.obtenerDescripcionFrecuencia(puntajeFrecuencia);
            const descripcionTotal = this.obtenerDescripcionTotal(puntajeTotal);


            const metricaElement = document.createElement("div");
            metricaElement.innerHTML = `
                <p>Métrica ${index + 1}:</p>
                <p>Pruebas añadidas: ${metrica.pruebasAñadidas}</p>
                <p>Puntuación Pruebas: ${puntajePruebas} - ${descripcionPruebas}</p>
                <p>Líneas de código: ${metrica.lineasDeCodigo}</p>
                <p>Puntuación Líneas: ${puntajeLineas} - ${descripcionLineas}</p>
                <p>Cobertura: ${metrica.cobertura}%</p>
                <p>Puntuación Cobertura: ${puntajeCobertura} - ${descripcionCobertura}</p>

                <p>Complejidad: ${metrica.complejidad}</p>
                <p>Puntuación complejidad: ${puntajeComplejidad}</p>

                <p>Fecha del commit: ${metrica.fecha}</p>
                <p>Puntuación Frecuencia: ${puntajeFrecuencia} - ${descripcionFrecuencia}</p>

                <p>Puntaje Total: ${puntajeTotal} - ${descripcionTotal}</p>
                <button class="eliminar-metrica" data-metrica-index="${index}">Eliminar Métrica</button>
            `;
            metricasContainer.appendChild(metricaElement);
            metricaAnterior = metrica;

        });
    }
}
