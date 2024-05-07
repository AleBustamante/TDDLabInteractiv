import { CalcularPuntosPorPruebas ,CalcularPuntosPorLineas, puntajePorCobertura, generarRecomendacion} from "./moduloPuntaje.js";

describe("Calcular Puntos", () => {
  it("Debería obtener 50 puntos si las pruebas son 1", () => {
    expect(CalcularPuntosPorPruebas(1)).toBe(50);
  });
  it("Debería obtener 25 puntos si las pruebas son entre 2 y 3", () => {
    expect(CalcularPuntosPorPruebas(3)).toBe(25);
  });
  it("Debería obtener 0 puntos si las pruebas son mas de 3 o 0", () => {
    expect(CalcularPuntosPorPruebas(0)).toBe(0);
  });
  it("Debería obtener 3 puntos si las lineas de codigo son entre 5 y 10", () => {
    expect(CalcularPuntosPorLineas(6)).toBe(75);
  });
  it("Debería obtener 1 puntos si las lineas de codigo son entre 1 y 4 tambien entre 11 y 20", () => {
    expect(CalcularPuntosPorLineas(15)).toBe(25);
    expect(CalcularPuntosPorLineas(1)).toBe(25);
  });
  it("Debería obtener 0 puntos si las lineas de codigo son mayores a 20", () => {
    expect(CalcularPuntosPorLineas(21)).toBe(0);
  });
});


describe("calcularPuntajePorCobertura", () => {
  it("Debería otorgar un puntaje de 0 cuando la cobertura de codigo fue del 0%", () => {
    expect(puntajePorCobertura(0)).toEqual(0);
  });
  it("Debería otorgar un puntaje de 100 cuando la cobertura de codigo fue del 100%", () => {
    expect(puntajePorCobertura(100)).toEqual(100);
  });
  it("Debería otorgar un puntaje proporcional al logaritmo en base 10. Caso cobertura al 40%", () => {
    expect(puntajePorCobertura(40)).toEqual(60);
  });
  it("Debería otorgar un puntaje proporcional al logaritmo en base 10. Caso cobertura al 75%", () => {
    expect(puntajePorCobertura(75)).toEqual(87);
  });
});

describe("generarRecomendacionPersonalizada", () => {
  it("Debería generar una recomendacion para el caso en que todos los puntajes sean malos", () => {
    expect(generarRecomendacion(0, 0, 0)).toEqual("Tus puntajes son muy bajos. Debes mejorar en todas las métricas");
  });
  it("Debería generar una recomendacion para el caso en que un puntaje sea malo y los otros dos sean excelentes", () => {
    expect(generarRecomendacion(0, 75, 100)).toEqual("Obtuviste un puntaje bajo en la cantidad de pruebas. Te hace falta trabajar mucho esta métrica. Obtuviste un puntaje muy alto en líneas de código. ¡Continúa trabajando así. Obtuviste un puntaje muy alto en la cobertura de código. ¡Continúa trabajando así. ");
  });
  it("Debería generar una recomendacion para el caso en que haya puntajes regulares", () => {
    expect(generarRecomendacion(25, 25, 51)).toEqual("Obtuviste un puntaje aceptable en la cantidad de pruebas. Todavía puedes mejorar esta métrica. Obtuviste un puntaje aceptable en líneas de código. Todavía puedes mejorar esta métrica. Obtuviste un puntaje aceptable en la cobertura de código. Todavía puedes mejorar esta métrica. ");
  });
  it("Debería generar una recomendacion para el caso en que todas las métricas sean altas", () => {
    expect(generarRecomendacion(50, 75, 90)).toEqual("Tu puntaje fue muy alto en todas las métricas, ¡felicidades! ");
  });
});