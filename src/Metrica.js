export default class Metrica {
    constructor(pruebasAñadidas, lineasDeCodigo, cobertura) {
        this.pruebasAñadidas = pruebasAñadidas;
        this.lineasDeCodigo = lineasDeCodigo;
        this.cobertura = cobertura;
    }
    crearMetrica(pruebasAñadidas, lineasDeCodigo, cobertura,complejidad) {
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
        const puntajeComplejidad=this.calcularPuntajeComplejidad(complejidad);
        const puntajeTotal = puntajePruebas + puntajeLineas + puntajeCobertura;

        const descripcionPruebas = this.obtenerDescripcionPruebas(puntajePruebas);
        const descripcionLineas = this.obtenerDescripcionLineas(puntajeLineas);
        const descripcionCobertura = this.obtenerDescripcionCobertura(puntajeCobertura);


        const descripcionTotal = this.obtenerDescripcionTotal(puntajeTotal);

        return new Metrica(pruebasAñadidas, lineasDeCodigo, cobertura, puntajeTotal, descripcionPruebas, descripcionLineas, descripcionCobertura, descripcionTotal);

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

    calcularPuntajeComplejidad(complejidad)
    {
        let puntajeComplejidad=8;
        if(complejidad=="Deficiente")
        {
            puntajeComplejidad=8;
        }
        if(complejidad=="Regular")
        {
            puntajeComplejidad=12;
        }
        if(complejidad=="Bueno")
        {
            puntajeComplejidad=16;
        }
        if(complejidad=="Excelente")
        {
            puntajeComplejidad=20;
        }
        return puntajeComplejidad;
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

    obtenerDescripcionCobertura(puntajeCobertura) {
        if (puntajeCobertura >= 9) {
            return "Excelente: La cobertura de pruebas es muy alta, lo que garantiza una amplia protección contra errores.";
        } else if (puntajeCobertura >= 7) {
            return "Bueno: La cobertura de pruebas es adecuada, aunque pueden existir áreas que necesiten más pruebas.";
        } else {
            return "Insuficiente: La cobertura de pruebas es baja, lo que deja áreas críticas sin suficiente protección.";
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


    mostrarMetricasProyecto(proyecto) {
        const metricasContainer = document.querySelector("#metricas-container");
        metricasContainer.innerHTML = "";

        proyecto.metricas.forEach((metrica, index) => {
            const puntajePruebas = this.calcularPuntajePruebas(metrica.pruebasAñadidas);
            const puntajeLineas = this.calcularPuntajeLineas(metrica.lineasDeCodigo);
            const puntajeCobertura = this.calcularPuntajeCobertura(metrica.cobertura);
            const puntajeTotal = puntajePruebas + puntajeLineas + puntajeCobertura;

            const descripcionPruebas = this.obtenerDescripcionPruebas(puntajePruebas);
            const descripcionLineas = this.obtenerDescripcionLineas(puntajeLineas);
            const descripcionCobertura = this.obtenerDescripcionCobertura(puntajeCobertura);
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
                <p>Puntaje Total: ${puntajeTotal} - ${descripcionTotal}</p>
                <button class="eliminar-metrica" data-metrica-index="${index}">Eliminar Métrica</button>
            `;
            metricasContainer.appendChild(metricaElement);

        });
    }
}
