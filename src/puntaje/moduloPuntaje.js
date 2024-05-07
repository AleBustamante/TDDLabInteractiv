import { crearMetrica } from "../MetricaIndex/moduloMetrica";

function CalcularPuntosPorPruebas(pruebasAñadidas) {
  let puntos = 0;
  if (pruebasAñadidas === 1) {
     puntos = 50;
  }
  if (pruebasAñadidas > 1 && pruebasAñadidas <= 3) {
    puntos = 25;
  }
  if (pruebasAñadidas > 3 || pruebasAñadidas === 0) {
    puntos = 0;
  }
  return puntos
}

function CalcularPuntosPorLineas(LineasAñadidas) {
  let puntos = 0;
  if (LineasAñadidas >= 5  && LineasAñadidas <= 10) {
     puntos = 75;
  }
  if (LineasAñadidas <= 4 || (LineasAñadidas >= 11 && LineasAñadidas <= 20) ) {
    puntos = 25;
  }
  if (LineasAñadidas >= 21 ) {
    puntos = 0;
  }
  return puntos;
}

function puntajeLogaritmico(puntaje) {
    const MULTIPLIER = 100;
    const LOG_REDUCTION = 1;
    return (Math.log10(puntaje) - LOG_REDUCTION) * MULTIPLIER;
}
function puntajePorCobertura(porcetajeCubierto) {
    let metrica = crearMetrica(0, 0, porcetajeCubierto);
    if (metrica.cobertura === 0) {
        return 0;
    }
    return Math.trunc(puntajeLogaritmico(metrica.cobertura));
}

function concaternarTextoPuntajeAlto(metrica) {
  const PREFIJO = "Obtuviste un puntaje muy alto en ";
  const SUFIJO = " ¡Continúa trabajando así. ";
  let texto = PREFIJO;
  texto += metrica;
  texto += SUFIJO;
  return texto;
}
function concaternarTextoPuntajeMedio(metrica) {
  const PREFIJO = "Obtuviste un puntaje aceptable en ";
  const SUFIJO = " Todavía puedes mejorar esta métrica. ";
  let texto = PREFIJO;
  texto += metrica;
  texto += SUFIJO;
  return texto;
}
function concaternarTextoPuntajeBajo(metrica) {
  const PREFIJO = "Obtuviste un puntaje bajo en ";
  const SUFIJO = " Te hace falta trabajar mucho esta métrica. ";
  let texto = PREFIJO;
  texto += metrica;
  texto += SUFIJO;
  return texto;
}

function generarRecomendacion(puntajeFinalPruebas, puntajeFinalLineas, puntajeFinalCobertura) {
  let recomendacion = "";
  if (puntajeFinalPruebas === 0 && puntajeFinalLineas === 0 && puntajeFinalCobertura < 10) {
    return "Tus puntajes son muy bajos. Debes mejorar en todas las métricas";
  }
  if (puntajeFinalPruebas === 50 && puntajeFinalLineas === 75 && puntajeFinalCobertura > 75) {
    return "Tu puntaje fue muy alto en todas las métricas, ¡felicidades! ";
  }
  if (puntajeFinalPruebas === 50) {
    recomendacion += concaternarTextoPuntajeAlto("la cantidad de pruebas.");
  }
  else if (puntajeFinalPruebas === 25){
    recomendacion += concaternarTextoPuntajeMedio("la cantidad de pruebas.");
  }
  else {
    recomendacion += concaternarTextoPuntajeBajo("la cantidad de pruebas.");
  }
  if (puntajeFinalLineas === 75) {
    recomendacion += concaternarTextoPuntajeAlto("líneas de código.");
  }
  else if (puntajeFinalLineas === 50 || puntajeFinalLineas === 25){
    recomendacion += concaternarTextoPuntajeMedio("líneas de código.");
  }
  else {
    recomendacion += concaternarTextoPuntajeBajo("líneas de código.");
  }
  if (puntajeFinalCobertura >= 70) {
    recomendacion += concaternarTextoPuntajeAlto("la cobertura de código.");
  }
  else if (puntajeFinalCobertura >= 50) {
    recomendacion += concaternarTextoPuntajeMedio("la cobertura de código.");
  }
  else {
    recomendacion += concaternarTextoPuntajeBajo("la cobertura de código.");
  }
  return recomendacion;
}

export {CalcularPuntosPorPruebas, CalcularPuntosPorLineas, puntajePorCobertura, generarRecomendacion};