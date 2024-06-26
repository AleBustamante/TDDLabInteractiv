import Metrica from "../Metrica.js";
import Proyecto from "../Proyecto.js";

describe("crearMetrica", () => {
  it("Debería crear una nueva instancia de Metrica con los valores dados (no refactor)", () => {
    const aux = new Metrica();
    const metrica = aux.crearMetrica(10, 100, 80);
    expect(metrica).toBeInstanceOf(Metrica);
    expect(metrica.pruebasAñadidas).toBe(10);
    expect(metrica.lineasDeCodigo).toBe(100);
    expect(metrica.cobertura).toBe(80);
  });

  it("Debería manejar valores nulos o indefinidos", () => {
    const aux = new Metrica();
    const metrica = aux.crearMetrica(null, undefined, 50);
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(50);
  });

  it("Debería manejar valores negativos", () => {
    const aux = new Metrica();
    const metrica = aux.crearMetrica(-5, -50, -20);
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(0);
  });

  it("Debería limitar los valores a un máximo de 100", () => {
    const aux = new Metrica();
    const metrica = aux.crearMetrica(200, 150, 120);
    expect(metrica).toBeNull();
  });

  //Esta prueba se tiene que quitar en un futuro
  it("Debería mostrar un mensaje si los valores superan 100", () => {
    const metrica = new Metrica();
    console.log = jest.fn();
    metrica.crearMetrica(200, 150, 120);
    expect(console.log).toHaveBeenCalledWith("Ponga un valor real por favor");
  });

});

describe("agregarMetricaAProyecto", () => {
  it("Debería agregar la métrica al proyecto y retornar la última métrica agregada (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    const ultimaMetricaAgregada = metrica.agregarMetricaAProyecto(metrica, proyecto);
    expect(proyecto.metricas.length).toBe(1);
    expect(ultimaMetricaAgregada).toBe(metrica);
  });
  it("Debería retornar un mensaje si se intenta agregar una métrica a un proyecto no existente (no refac)", () => {
    const proyecto = null;
    const metrica = new Metrica(10, 100, 80);
    const mensaje = metrica.agregarMetricaAProyecto(metrica, proyecto);
    expect(mensaje).toBe("No se puede agregar una métrica a un proyecto no existente");
  });
});

describe("eliminarMetricaDeProyecto", () => {
  it("Debería eliminar la métrica del proyecto y retornar un mensaje de éxito (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    proyecto.metricas.push(metrica);
    const mensaje = metrica.eliminarMetricaDeProyecto(metrica, proyecto);
    expect(proyecto.metricas.length).toBe(0);
    expect(mensaje).toBe("Se eliminó la métrica del proyecto con éxito");
  });
  it("Debería retornar un mensaje si se intenta eliminar una métrica que no existe en el proyecto (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    const mensaje = metrica.eliminarMetricaDeProyecto(metrica, proyecto);
    expect(mensaje).toBe("No se puede eliminar una métrica que no existe en el proyecto");
  });
});

describe("calcularPuntajeLineas", () => {
  it("Debería devolver 20 cuando las lineas de codigo son 20 o menos", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeLineas(0)).toBe(20);
    expect(metrica.calcularPuntajeLineas(10)).toBe(20);
    expect(metrica.calcularPuntajeLineas(20)).toBe(20);
  });
  it("Debería devolver 16 cuando las lineas de codigo son menos de 40 y mas de 20", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeLineas(40)).toBe(16);
    expect(metrica.calcularPuntajeLineas(30)).toBe(16);
    expect(metrica.calcularPuntajeLineas(21)).toBe(16);
  });
  it("Debería devolver 12 cuando las lineas de codigo son menos de 60 y mas de 40", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeLineas(41)).toBe(12);
    expect(metrica.calcularPuntajeLineas(50)).toBe(12);
    expect(metrica.calcularPuntajeLineas(60)).toBe(12);
  });
  it("Debería devolver 8 cuando las lineas de codigo son mas de 60", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeLineas(61)).toBe(8);
    expect(metrica.calcularPuntajeLineas(100)).toBe(8);
  });
})

describe("Metrica", () => {
  let metrica;

  beforeEach(() => {
    metrica = new Metrica();
  });

  describe("calcularPromedioPuntajeDeLineas", () => {
    it("debería devolver 0 si no se proporcionan métricas", () => {
      const metricas = [];
      expect(metrica.calcularPromedioPuntajeDeLineas(metricas)).toBe(0);
    });
  });

  it("debería calcular el promedio correctamente con métricas válidas", () => {
    const metricas = [
      { lineasDeCodigo: 10 },  // Puntaje 20
      { lineasDeCodigo: 30 },  // Puntaje 16
      { lineasDeCodigo: 50 }   // Puntaje 12
    ];
    const promedio = metrica.calcularPromedioPuntajeDeLineas(metricas);
    expect(promedio).toBe(16);
  });

  it("debería devolver 0 si todas las métricas tienen un número de líneas negativo o no definido", () => {
    const metricas = [
      { lineasDeCodigo: -10 },
      { lineasDeCodigo: undefined },
      { lineasDeCodigo: -20 }
    ];
    const promedio = metrica.calcularPromedioPuntajeDeLineas(metricas);
    expect(promedio).toBe(0);
  });

});

describe("calcularPuntajeCobertura", () => {
  it("Debería devolver 20 cuando el porcentaje de cobertura sea mas de 90", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeCobertura(90)).toBe(20);
    expect(metrica.calcularPuntajeCobertura(100)).toBe(20);
    expect(metrica.calcularPuntajeCobertura(120)).toBe(20);
  });
  it("Debería devolver 16 cuando el porcentaje de cobertura sea mas de 80 y menos de 90", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeCobertura(80)).toBe(16);
    expect(metrica.calcularPuntajeCobertura(85)).toBe(16);
    expect(metrica.calcularPuntajeCobertura(89)).toBe(16);
  });
  it("Debería devolver 12 cuando el porcentaje de cobertura sea mas de 70 y menos de 80", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeCobertura(70)).toBe(12);
    expect(metrica.calcularPuntajeCobertura(75)).toBe(12);
    expect(metrica.calcularPuntajeCobertura(79)).toBe(12);
  });
  it("Debería devolver 8 cuando el porcentaje de cobertura sea menos de 70", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajeCobertura(69)).toBe(8);
    expect(metrica.calcularPuntajeCobertura(65)).toBe(8);
    expect(metrica.calcularPuntajeCobertura(1)).toBe(8);
  });
})

describe("Metrica", () => {
  let metrica;

  beforeEach(() => {
    metrica = new Metrica();
  });

  describe("calcularPromedioPuntajeDeCobertura", () => {
    it("debería devolver 0 si no se proporcionan métricas", () => {
      const metricas = [];
      expect(metrica.calcularPromedioPuntajeDeCobertura(metricas)).toBe(0);
    });
  });

  it("debería calcular el promedio correctamente con métricas válidas", () => {
    const metricas = [
      { cobertura: 90 },  // Puntaje 20
      { cobertura: 85 },  // Puntaje 16
      { cobertura: 75 }   // Puntaje 12
    ];
    const promedio = metrica.calcularPromedioPuntajeDeCobertura(metricas);
    expect(promedio).toBe(16);
  });

  it("debería devolver 0 si todas las métricas tienen un número de líneas negativo o no definido", () => {
    const metricas = [
      { cobertura: -10 },
      { cobertura: undefined },
      { cobertura: -20 }
    ];
    const promedio = metrica.calcularPromedioPuntajeDeCobertura(metricas);
    expect(promedio).toBe(0);
  });


  //Pruebas alejandra

  // it("Deberia devolver 10 puntos para puntaje de pruebas para pruebas <=10", () => {
  //   metrica = new Metrica(10, 10, 100);
  //   expect(metrica.calcularPuntajePruebas(10)).toBe(10);
  // });

  // it("Deberia devolver 8 puntos para puntaje de pruebas para pruebas <=20", () => {
  //   metrica = new Metrica(10, 10, 100);
  //   expect(metrica.calcularPuntajePruebas(20)).toBe(8);
  // });

  // it("Deberia devolver 5 puntos para puntaje de pruebas para pruebas mayores a 21", () => {
  //   metrica = new Metrica(10, 10, 100);
  //   expect(metrica.calcularPuntajePruebas(30)).toBe(5);
  // });


  it("Deberia devolver una descripcion para 7 pruebas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionPruebas(7)).toBe("Bueno: Se han realizado pruebas adecuadas, pero pueden ser mejoradas para una cobertura más completa.");
  });

  it("Deberia devolver una descripcion para 4 pruebas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionPruebas(4)).toBe("Insuficiente: La cantidad de pruebas realizadas es baja, lo que puede afectar la calidad del código.");
  });

  it("Deberia devolver una descripcion de las lineas, para puntaje de lineas 7 ", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionLineas(4)).toBe("Demasiado grande: El código es demasiado extenso, lo que puede dificultar su mantenimiento y comprensión.");
  });

  it("Deberia devolver una descripcion de cobertura, para puntaje de cobertura 4 ", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionCobertura(4)).toBe("Deficiente: La cobertura de pruebas es baja, lo que deja áreas críticas sin suficiente protección.");
  });

  it("Deberia devolver una descripcion de puntaje total, para puntaje total de 20 ", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionTotal(20)).toBe("Buen trabajo, el proyecto tiene un nivel aceptable de calidad.");
  });
  it("Deberia devolver una descripcion de puntaje total, para puntaje total de 15 ", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionTotal(15)).toBe("El proyecto necesita mejoras para alcanzar un nivel adecuado de calidad.");
  });

  it("Deberia devolver una descripcion de puntaje total, para puntaje total de 5 ", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.obtenerDescripcionTotal(5)).toBe("Se requieren mejoras significativas, el proyecto tiene un bajo nivel de calidad.");
  });

  // it("si en todos los commits del proyecto se incluyen pruebas, el puntaje sera de 20 puntos", () => {
  //   const metricas = [
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 1 }
  //   ];
  //   const puntaje = metrica.calcularPromedioPuntajeDePrueba(metricas);
  //   expect(puntaje).toBe(20);
  // });
  // it("si en el 80 a 99% de los commits del proyecto se incluyen pruebas, el puntaje sera de 16 puntos", () => {
  //   const metricas = [
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 0 },
  //     { pruebasAñadidas: 1 }
  //   ];
  //   const puntaje = metrica.calcularPromedioPuntajeDePrueba(metricas);
  //   expect(puntaje).toBe(16);
  // });
  // it("si en el 60 a 79% de los commits del proyecto se incluyen pruebas, el puntaje sera de 12 puntos", () => {
  //   const metricas = [
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 0 },
  //     { pruebasAñadidas: 1 }
  //   ];
  //   const puntaje = metrica.calcularPromedioPuntajeDePrueba(metricas);
  //   expect(puntaje).toBe(12);
  // });
  // it("si en el 0 a 60% de los commits del proyecto se incluyen pruebas, el puntaje sera de 8 puntos", () => {
  //   const metricas = [
  //     { pruebasAñadidas: 1 },
  //     { pruebasAñadidas: 0 },
  //     { pruebasAñadidas: 0 },
  //     { pruebasAñadidas: 1 }
  //   ];
  //   const puntaje = metrica.calcularPromedioPuntajeDePrueba(metricas);
  //   expect(puntaje).toBe(8);
  // });

  //5ta HU Ale
  it("Deberia devolver un puntaje de 8 para complejidad Deficiente", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("Deficiente")).toBe(8);
  });

  it("Deberia devolver un puntaje de 12 para complejidad Regular", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("Regular")).toBe(12);
  });

  it("Deberia devolver un puntaje de 16 para complejidad Bueno", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("Bueno")).toBe(16);
  });

  it("Deberia devolver un puntaje de 20 para complejidad Excelente", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("Excelente")).toBe(20);
  });

  it("Debería ser insensible a mayúsculas y minúsculas", () => {
    expect(metrica.calcularPuntajeComplejidad("Deficiente")).toBe(8);
    expect(metrica.calcularPuntajeComplejidad("Regular")).toBe(12);
    expect(metrica.calcularPuntajeComplejidad("Bueno")).toBe(16);
    expect(metrica.calcularPuntajeComplejidad("Excelente")).toBe(20);
  });

  it("Deberia devolver un puntaje de 8 para complejidad Deficiente ignorando mayusculas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("DeFicIEnTe")).toBe(8);
  });

  it("Deberia devolver un puntaje de 12 para complejidad Regular ignorando mayusculas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("ReguLAR")).toBe(12);
  });

  it("Deberia devolver un puntaje de 16 para complejidad Bueno, ignorando mayusculas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("BuENo")).toBe(16);
  });

  it("Deberia devolver un puntaje de 20 para complejidad Excelente, ignorando mayusculas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("EXceLENte")).toBe(20);
  });

  it("Deberia devolver un puntaje de 20 para complejidad Excelente, ignorando mayusculas", () => {
    metrica = new Metrica(10, 10, 100);
    expect(metrica.calcularPuntajeComplejidad("EXceLENte")).toBe(20);
  });

  it("debería devolver 8 si no hay metricas", () => {
    const metricas = [];
    const promedio = metrica.calcularPromedioPuntajeComplejidad(metricas);
    expect(promedio).toBe(8);
  });
  it("debería devolver el puntaje de complejidad promedio si hay métricas válidas", () => {
    const metricas = [
      { complejidad: "Deficiente" },
      { complejidad: "Regular" },
      { complejidad: "Bueno" },
      { complejidad: "Excelente" }
    ];
    const promedio = metrica.calcularPromedioPuntajeComplejidad(metricas);
    expect(promedio).toBe(14);
  });
  it("debería devolver el puntaje de complejidad promedio si hay métricas válidas", () => {
    const metricas = [
      { complejidad: "Deficiente" },
      { complejidad: "Deficiente" },
      { complejidad: "Deficiente" },
      { complejidad: "Deficiente" }
    ];
    const promedio = metrica.calcularPromedioPuntajeComplejidad(metricas);
    expect(promedio).toBe(8);
  });


  describe("calcular puntaje por frecuencia", () => {
    it("Deberia mostrar el máximo puntaje para el primer commit (todavia no se puede calcular la frecuencia de los commits)", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = null;
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, null, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(20);
    });
    it("Deberia mostrar el máximo puntaje para un commit realizado a menos de 2 dias del anterior", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-02T10:00:00");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(20);
    });
    it("Deberia mostrar el máximo puntaje para un commit realizado a menos de 2 dias del anterior (caso limite)", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-03T09:59:59");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(20);
    });
    it("Deberia mostrar un puntaje de 16 para un commit realizado a mas de 2 y menos de 3 dias del anterior", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-03T20:00:00");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(16);
    });
    it("Deberia mostrar un puntaje de 16 para un commit realizado a mas de 2 y menos de 3 dias del anterior (caso extremo)", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-04T09:59:59");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(16);
    });
    it("Deberia mostrar un puntaje de 12 para un commit realizado a mas de 3 y menos de 4 dias del anterior", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-04T20:00:00");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(12);
    });
    it("Deberia mostrar un puntaje de 12 para un commit realizado a mas de 3 y menos de 4 dias del anterior (caso extremo)", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-05T09:59:59");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(12);
    });
    it("Deberia mostrar un puntaje de 8 para un commit realizado a mas de 4 dias del anterior", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-07T10:00:00");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(8);
    });
    it("Deberia mostrar un puntaje de 8 para un commit realizado a mas de 4 dias del anterior (caso extremo)", () => {
      const aux = new Metrica();
      const primeraFecha = new Date("2024-01-01T10:00:00");
      const segundaFecha = new Date("2024-01-05T10:00:01");
      const primeraMetrica = aux.crearMetrica(1, 10, 90, primeraFecha, "Excelente");
      const segundaMetrica = aux.crearMetrica(1, 10, 90, segundaFecha, "Excelente");
      expect(segundaMetrica.calcularPuntajeFrecuencia(primeraMetrica)).toBe(8);
    });
  });


  describe("Mensaje adecuado para frecuencia", () => {
    it("Deberia devolver el mensaje adecuado para un frecuencia excelente", () => {
      const aux = new Metrica();
      const metrica = aux.crearMetrica(1, 10, 90, "2024-01-01T10:00:00", "Excelente");
      expect(metrica.obtenerDescripcionFrecuencia(20)).toBe("Excelente: los commits se han realizado de forma muy incremental en el tiempo");
    });
    it("Deberia devolver el mensaje adecuado para un frecuencia buena", () => {
      const aux = new Metrica();
      const metrica = aux.crearMetrica(1, 10, 90, "2024-01-01T10:00:00", "Excelente");
      expect(metrica.obtenerDescripcionFrecuencia(16)).toBe("Bueno: los commits se han realizado de forma suficientemente incremental en el tiempo");
    });
    it("Deberia devolver el mensaje adecuado para un frecuencia regular", () => {
      const aux = new Metrica();
      const metrica = aux.crearMetrica(1, 10, 90, "2024-01-01T10:00:00", "Excelente");
      expect(metrica.obtenerDescripcionFrecuencia(12)).toBe("Regular: los commits se han realizado de forma incremental, pero se puede mejorar");
    });
    it("Deberia devolver el mensaje adecuado para un frecuencia deficiente", () => {
      const aux = new Metrica();
      const metrica = aux.crearMetrica(1, 10, 90, "2024-01-01T10:00:00", "Excelente");
      expect(metrica.obtenerDescripcionFrecuencia(8)).toBe("Deficiente: los commits no se han realizado de forma incremental");
    });
  });

  describe("agregarMetricaAProyecto", () => {
    it("Debería agregar la métrica al proyecto y retornar la última métrica agregada (no refac)", () => {
      const proyecto = new Proyecto();
      const metrica = new Metrica(10, 100, 80);
      const ultimaMetricaAgregada = metrica.agregarMetricaAProyecto(metrica, proyecto);
      expect(proyecto.metricas.length).toBe(1);
      expect(ultimaMetricaAgregada).toBe(metrica);
    });
    it("Debería retornar un mensaje si se intenta agregar una métrica a un proyecto no existente (no refac)", () => {
      const proyecto = null;
      const metrica = new Metrica(10, 100, 80);
      const mensaje = metrica.agregarMetricaAProyecto(metrica, proyecto);
      expect(mensaje).toBe("No se puede agregar una métrica a un proyecto no existente");
    });
  });

  describe("eliminarMetricaDeProyecto", () => {
    it("Debería eliminar la métrica del proyecto y retornar un mensaje de éxito (no refac)", () => {
      const proyecto = new Proyecto();
      const metrica = new Metrica(10, 100, 80);
      proyecto.metricas.push(metrica);
      const mensaje = metrica.eliminarMetricaDeProyecto(metrica, proyecto);
      expect(proyecto.metricas.length).toBe(0);
      expect(mensaje).toBe("Se eliminó la métrica del proyecto con éxito");
    });
    it("Debería retornar un mensaje si se intenta eliminar una métrica que no existe en el proyecto (no refac)", () => {
      const proyecto = new Proyecto();
      const metrica = new Metrica(10, 100, 80);
      const mensaje = metrica.eliminarMetricaDeProyecto(metrica, proyecto);
      expect(mensaje).toBe("No se puede eliminar una métrica que no existe en el proyecto");
    });
  });

  describe("calcularPuntajeLineas", () => {
    it("Debería devolver 20 cuando las lineas de codigo son 20 o menos", () => {
      const metrica = new Metrica();
      expect(metrica.calcularPuntajeLineas(0)).toBe(20);
      expect(metrica.calcularPuntajeLineas(10)).toBe(20);
      expect(metrica.calcularPuntajeLineas(20)).toBe(20);
    });
    it("Debería devolver 16 cuando las lineas de codigo son menos de 40 y mas de 20", () => {
      const metrica = new Metrica();
      expect(metrica.calcularPuntajeLineas(40)).toBe(16);
      expect(metrica.calcularPuntajeLineas(30)).toBe(16);
      expect(metrica.calcularPuntajeLineas(21)).toBe(16);
    });
    it("Debería devolver 12 cuando las lineas de codigo son menos de 60 y mas de 40", () => {
      const metrica = new Metrica();
      expect(metrica.calcularPuntajeLineas(41)).toBe(12);
      expect(metrica.calcularPuntajeLineas(50)).toBe(12);
      expect(metrica.calcularPuntajeLineas(60)).toBe(12);
    });
    it("Debería devolver 8 cuando las lineas de codigo son mas de 60", () => {
      const metrica = new Metrica();
      expect(metrica.calcularPuntajeLineas(61)).toBe(8);
      expect(metrica.calcularPuntajeLineas(100)).toBe(8);
    });
  })



});


//pruebas del archivo
describe("procesarArchivoDeMetricas", () => {
  it("Debería devolver un array de métricas correctamente procesado con una métrica", () => {
    const metrica = new Metrica();
    const contenido = "10, 20, 80, 2024-06-01T08:00:00, Bueno";
    const proyecto = { titulo: "Proyecto de prueba", metricas: [] };

    const metricasProcesadas = metrica.procesarArchivoDeMetricas(contenido, proyecto);

    expect(metricasProcesadas.length).toBe(1);
    expect(metricasProcesadas[0].pruebasAñadidas).toBe(10);
    expect(metricasProcesadas[0].lineasDeCodigo).toBe(20);
    expect(metricasProcesadas[0].cobertura).toBe(80);
    expect(metricasProcesadas[0].fecha).toEqual(new Date("2024-06-01T08:00:00"));
    expect(metricasProcesadas[0].complejidad).toBe("Bueno");
    // Verificar que la métrica se agregó al proyecto
    expect(proyecto.metricas.length).toBe(1);
    expect(proyecto.metricas[0]).toBe(metricasProcesadas[0]);
  });

  it("Debería devolver un array de métricas correctamente procesado sin métricas", () => {
    const metrica = new Metrica();
    const contenido = "";
    const proyecto = { titulo: "Proyecto de prueba", metricas: [] };

    const metricasProcesadas = metrica.procesarArchivoDeMetricas(contenido, proyecto);

    expect(metricasProcesadas.length).toBe(0);
    // Verificar que no se agregaron métricas al proyecto
    expect(proyecto.metricas.length).toBe(0);
  });

  it("Debería devolver un array de métricas correctamente procesado con líneas vacías", () => {
    const metrica = new Metrica();
    const contenido = "\n\n10, 20, 80, 2024-06-01T08:00:00, Bueno\n\n";
    const proyecto = { titulo: "Proyecto de prueba", metricas: [] };

    const metricasProcesadas = metrica.procesarArchivoDeMetricas(contenido, proyecto);

    expect(metricasProcesadas.length).toBe(1);
    expect(metricasProcesadas[0].pruebasAñadidas).toBe(10);
    expect(metricasProcesadas[0].lineasDeCodigo).toBe(20);
    expect(metricasProcesadas[0].cobertura).toBe(80);
    expect(metricasProcesadas[0].fecha).toEqual(new Date("2024-06-01T08:00:00"));
    expect(metricasProcesadas[0].complejidad).toBe("Bueno");
    // Verificar que la métrica se agregó al proyecto
    expect(proyecto.metricas.length).toBe(1);
    expect(proyecto.metricas[0]).toBe(metricasProcesadas[0]);
  });
  

});

//freucuencia promedio puntaje
describe('calcularPromedioPuntajeDeFrecuencia', () => {
  it('debería retornar 0 cuando la lista de métricas está vacía', () => {
      const objMetricas = new Metrica();
      const resultado = objMetricas.calcularPromedioPuntajeDeFrecuencia([]);
      expect(resultado).toBe(0);
  });


  it('debería calcular el puntaje promedio correctamente cuando hay varias métricas', () => {
      const metrica1 = new Metrica(null, null, null, null, null, null); // Hace 1 día
      metrica1.frecuencia = "Excelente";
      const metrica2 = new Metrica(null, null, null, null, null, null); // Hace más de 3 días
      metrica2.frecuencia = "Regular";
      const metrica3 = new Metrica(null, null, null, null, null, null); // Hace más de 4 días
      metrica3.frecuencia = "Deficiente";
      const metricas = [metrica1, metrica2, metrica3];

      const objMetricas = new Metrica(null, null, null, null, null);
      const resultado = objMetricas.calcularPromedioPuntajeDeFrecuencia(metricas);

      // Puntajes esperados: 20 (hace 1 día), 12 (hace 3 días), 8 (hace 5 días)
      const puntajeEsperado = (20 + 12 + 8) / 3;
      expect(resultado).toBe(puntajeEsperado);
  });
});

//puntaje total

describe("calcularPuntajeTotal", () => {
  let metrica;
  let metricasMock;

  beforeEach(() => {
      metrica = new Metrica();
      metricasMock = [
          new Metrica(10, 20, 80, new Date("2024-06-01T08:00:00"), "Bueno"),
          new Metrica(20, 40, 90, new Date("2024-06-02T08:00:00"), "Excelente")
      ];
  });

  it("Debería devolver la suma de los promedios de todas las métricas", () => {
      const resultado = metrica.calcularPuntajeTotal(metricasMock);
      const esperado = (
          (metrica.calcularPuntajePruebas(10) + metrica.calcularPuntajePruebas(20)) / 2 + //20
          (metrica.calcularPuntajeLineas(20) + metrica.calcularPuntajeLineas(40)) / 2 + //18
          (metrica.calcularPuntajeCobertura(80) + metrica.calcularPuntajeCobertura(90)) / 2 + //18
          (metrica.calcularPuntajeComplejidad("Bueno") + metrica.calcularPuntajeComplejidad("Excelente")) / 2 + //18
          metrica.calcularPromedioPuntajeDeFrecuencia(metricasMock) //20
      );
      expect(resultado).toBeCloseTo(esperado, 5);
  });


  it("Debería manejar métricas con valores extremos", () => {
      const extremeMetricas = [
          new Metrica(0, 0, 0, new Date("2024-06-01T08:00:00"), "Deficiente"),
          new Metrica(100, 1000, 100, new Date("2024-06-02T08:00:00"), "Excelente")
      ];
      const resultado = metrica.calcularPuntajeTotal(extremeMetricas);
      const esperado = (
          metrica.calcularPromedioPuntajeDePruebas(extremeMetricas) + //8
          (metrica.calcularPuntajeLineas(0) + metrica.calcularPuntajeLineas(1000)) / 2 + //14
          (metrica.calcularPuntajeCobertura(0) + metrica.calcularPuntajeCobertura(100)) / 2 + //14
          (metrica.calcularPuntajeComplejidad("Deficiente") + metrica.calcularPuntajeComplejidad("Excelente")) / 2 + //14
          metrica.calcularPromedioPuntajeDeFrecuencia(extremeMetricas) //20
      );
      expect(resultado).toBeCloseTo(esperado, 5);
  });
});

describe("obtenerDescripcionPromedio", () => {
  it("Debería devolver 'Excelente' para puntajes entre 16 y 20", () => {
    const metrica = new Metrica();
    expect(metrica.obtenerDescripcionPromedio(17)).toBe("Excelente");
    expect(metrica.obtenerDescripcionPromedio(20)).toBe("Excelente");
  });

  it("Debería devolver 'Bueno' para puntajes entre 12 y 16", () => {
    const metrica = new Metrica();
    expect(metrica.obtenerDescripcionPromedio(12)).toBe("Bueno");
    expect(metrica.obtenerDescripcionPromedio(15)).toBe("Bueno");
  });

  it("Debería devolver 'Regular' para puntajes entre 8 y 12", () => {
    const metrica = new Metrica();
    expect(metrica.obtenerDescripcionPromedio(10)).toBe("Regular");
    expect(metrica.obtenerDescripcionPromedio(8.5)).toBe("Regular");
  });

  it("Debería devolver 'Deficiente' para puntajes menores o iguales a 8", () => {
    const metrica = new Metrica();
    expect(metrica.obtenerDescripcionPromedio(8)).toBe("Deficiente");
    expect(metrica.obtenerDescripcionPromedio(5)).toBe("Deficiente");
    expect(metrica.obtenerDescripcionPromedio(0)).toBe("Deficiente");
  });
});
