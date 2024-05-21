import { crearMetrica, agregarMetricaAProyecto, eliminarMetricaDeProyecto , calcularPuntajeCobertura, calcularPuntajeComplejidad, calcularPuntajeLineas, calcularPuntajePruebas, calcularPromedioPuntajeDePruebas, calcularPromedioPuntajeDeLineas, calcularPromedioPuntajeDeCobertura, calcularPromedioPuntajeDeComplejidad, calcularPromedioPuntajeDeFrecuencia,procesarArchivoDeMetricas, actualizarProyectoEnArray, obtenerDescripcionPromedio} from "./moduloMetrica.js";
import Metrica from "../Metrica.js";
import Proyecto from "../Proyecto.js";

describe("crearMetrica", () => {
  it("Debería manejar valores nulos o indefinidos", () => {
    const metrica = crearMetrica(null, undefined, 50, "12/04/2024-08:24", "alta");
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(50);
  });

  it("Debería manejar valores negativos", () => {
    const metrica = crearMetrica(-5, -50, -20, "12/04/2024-08:24", "alta");
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(0);
  });

  it("Debería manejar valores por encima del tope", () => {
    const metrica = crearMetrica(110, 120, 110, "12/04/2024-08:24", "alta");
    expect(metrica).toBeNull();
  });

  it("Debería manejar el formato de fecha y hora", () => {
    const metrica = crearMetrica(10, 100, 80, "12-04-2024-08:24", "alta");
    expect(metrica).toBeNull();
  });

  it("Debería manejar el tipo de complejidad", () => {
    const metrica = crearMetrica(10, 100, 80, "12/04/2024-08:24", 5);
    expect(metrica).toBeNull();
  });

  it("Debería crear una nueva instancia de Metrica con los valores dados", () => {
    const metrica = crearMetrica(10, 100, 80, "12/04/2024-08:24", "alta");
    expect(metrica).toBeInstanceOf(Metrica);
    expect(metrica.pruebasAñadidas).toBe(10);
    expect(metrica.lineasDeCodigo).toBe(100);
    expect(metrica.cobertura).toBe(80);
  });
  it("Debería limitar los valores a un máximo de 100", () => {
    const metrica = crearMetrica(200, 150, 120);
    expect(metrica).toBeNull();
  });

  it("Debería mostrar un mensaje si los valores superan 100", () => {
    console.log = jest.fn();
    crearMetrica(200, 150, 120);
    expect(console.log).toHaveBeenCalledWith("Ponga un valor real por favor");
  });

});

describe("agregarMetricaAProyecto", () => {
  it("Debería agregar la métrica al proyecto y retornar la última métrica agregada (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    const ultimaMetricaAgregada = agregarMetricaAProyecto(metrica, proyecto);
    expect(proyecto.metricas.length).toBe(1);
    expect(ultimaMetricaAgregada).toBe(metrica);
  });
  it("Debería retornar un mensaje si se intenta agregar una métrica a un proyecto no existente (no refac)", () => {
    const proyecto = null;
    const metrica = new Metrica(10, 100, 80);
    const mensaje = agregarMetricaAProyecto(metrica, proyecto);
    expect(mensaje).toBe("No se puede agregar una métrica a un proyecto no existente");
  });
});

describe("eliminarMetricaDeProyecto", () => {
  it("Debería eliminar la métrica del proyecto y retornar un mensaje de éxito (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    proyecto.metricas.push(metrica);
    const mensaje = eliminarMetricaDeProyecto(metrica, proyecto);
    expect(proyecto.metricas.length).toBe(0);
    expect(mensaje).toBe("Se eliminó la métrica del proyecto con éxito");
  });
  it("Debería retornar un mensaje si se intenta eliminar una métrica que no existe en el proyecto (no refac)", () => {
    const proyecto = new Proyecto();
    const metrica = new Metrica(10, 100, 80);
    const mensaje = eliminarMetricaDeProyecto(metrica, proyecto);
    expect(mensaje).toBe("No se puede eliminar una métrica que no existe en el proyecto");
  });
});   

describe("calcularPuntajePruebas", () => {
  it("Debería retornar 20 si se añaden 1 o más pruebas", () => {
    expect(calcularPuntajePruebas(1)).toBe(20);
    expect(calcularPuntajePruebas(5)).toBe(20);
    expect(calcularPuntajePruebas(10)).toBe(20);
  });

  it("Debería retornar 8 si no se añaden pruebas", () => {
    expect(calcularPuntajePruebas(0)).toBe(8);
    expect(calcularPuntajePruebas(-5)).toBe(8);
  });
});

describe("calcularPuntajeLineas", () => {
  it("Debería retornar 20 si se modifican hasta 20 líneas de código", () => {
    expect(calcularPuntajeLineas(20)).toBe(20);
  });

  it("Debería retornar 16 si se modifican entre 21 y 40 líneas de código", () => {
    expect(calcularPuntajeLineas(21)).toBe(16);
    expect(calcularPuntajeLineas(35)).toBe(16);
    expect(calcularPuntajeLineas(40)).toBe(16);
  });

  it("Debería retornar 12 si se modifican entre 41 y 60 líneas de código", () => {
    expect(calcularPuntajeLineas(41)).toBe(12);
    expect(calcularPuntajeLineas(50)).toBe(12);
    expect(calcularPuntajeLineas(60)).toBe(12);
  });

  it("Debería retornar 8 si se modifican más de 60 líneas de código", () => {
    expect(calcularPuntajeLineas(61)).toBe(8);
    expect(calcularPuntajeLineas(80)).toBe(8);
    expect(calcularPuntajeLineas(100)).toBe(8);
  });
});


describe("calcularPuntajeCobertura", () => {
  it("Debería retornar 20 si la cobertura es mayor al 90%", () => {
    expect(calcularPuntajeCobertura(91)).toBe(20);
  });

  it("Debería retornar 16 si la cobertura es mayor al 80%", () => {
    expect(calcularPuntajeCobertura(85)).toBe(16);
  });

  it("Debería retornar 12 si la cobertura es mayor al 70%", () => {
    expect(calcularPuntajeCobertura(75)).toBe(12);
  });

  it("Debería retornar 8 si la cobertura es menor o igual al 70%", () => {
    expect(calcularPuntajeCobertura(70)).toBe(8);
  });
});


describe("calcularPuntajeComplejidad", () => {
  it("Debería retornar 20 si la complejidad es baja", () => {
    expect(calcularPuntajeComplejidad("baja")).toBe(20);
  });

  it("Debería retornar 16 si la complejidad es moderada", () => {
    expect(calcularPuntajeComplejidad("moderada")).toBe(16);
  });

  it("Debería retornar 12 si la complejidad es alta", () => {
    expect(calcularPuntajeComplejidad("alta")).toBe(12);
  });

  it("Debería retornar 8 si la complejidad es muy alta", () => {
    expect(calcularPuntajeComplejidad("muy alta")).toBe(8);
  });

  it("Debería retornar 0 si la complejidad no es reconocida", () => {
    expect(calcularPuntajeComplejidad("desconocida")).toBe(0);
  });
});

describe("calcularPuntajePruebas", () => {
  it("Debería retornar 20 si se añaden 1 o más pruebas", () => {
      expect(calcularPuntajePruebas(1)).toBe(20);
      expect(calcularPuntajePruebas(5)).toBe(20);
      expect(calcularPuntajePruebas(10)).toBe(20);
  });

  it("Debería retornar 8 si no se añaden pruebas", () => {
      expect(calcularPuntajePruebas(0)).toBe(8);
  });

  it("Debería manejar valores negativos", () => {
      expect(calcularPuntajePruebas(-1)).toBe(8);
      expect(calcularPuntajePruebas(-10)).toBe(8);
  });

  it("Debería manejar valores no numéricos", () => {
      expect(calcularPuntajePruebas("")).toBe(8);
      expect(calcularPuntajePruebas(null)).toBe(8);
      expect(calcularPuntajePruebas(undefined)).toBe(8);
      expect(calcularPuntajePruebas(false)).toBe(8);
  });
});

describe("calcularPuntajeLineas", () => {
  it("Debería retornar 20 si hay 20 o menos líneas de código", () => {
      expect(calcularPuntajeLineas(20)).toBe(20);
      expect(calcularPuntajeLineas(10)).toBe(20);
  });

  it("Debería retornar 16 si hay entre 21 y 40 líneas de código", () => {
      expect(calcularPuntajeLineas(30)).toBe(16);
      expect(calcularPuntajeLineas(40)).toBe(16);
  });

  it("Debería retornar 12 si hay entre 41 y 60 líneas de código", () => {
      expect(calcularPuntajeLineas(50)).toBe(12);
      expect(calcularPuntajeLineas(60)).toBe(12);
  });

  it("Debería retornar 8 si hay más de 60 líneas de código", () => {
      expect(calcularPuntajeLineas(61)).toBe(8);
      expect(calcularPuntajeLineas(100)).toBe(8);
  });

});


describe("calcularPuntajeCobertura", () => {
  it("Debería retornar 20 si la cobertura es mayor que 90%", () => {
      expect(calcularPuntajeCobertura(91)).toBe(20);
      expect(calcularPuntajeCobertura(100)).toBe(20);
  });

  it("Debería retornar 16 si la cobertura está entre 81% y 90%", () => {
      expect(calcularPuntajeCobertura(81)).toBe(16);
      expect(calcularPuntajeCobertura(90)).toBe(16);
  });

  it("Debería retornar 12 si la cobertura está entre 71% y 80%", () => {
      expect(calcularPuntajeCobertura(71)).toBe(12);
      expect(calcularPuntajeCobertura(80)).toBe(12);
  });

  it("Debería retornar 8 si la cobertura es menor o igual al 70%", () => {
      expect(calcularPuntajeCobertura(70)).toBe(8);
      expect(calcularPuntajeCobertura(50)).toBe(8);
  });

  it("Debería manejar valores negativos", () => {
      expect(calcularPuntajeCobertura(-10)).toBe(8);
  });

});

describe("calcularPuntajeComplejidad", () => {
  it("Debería retornar 20 si la complejidad es 'baja'", () => {
      expect(calcularPuntajeComplejidad("baja")).toBe(20);
  });

  it("Debería retornar 16 si la complejidad es 'moderada'", () => {
      expect(calcularPuntajeComplejidad("moderada")).toBe(16);
  });

  it("Debería retornar 12 si la complejidad es 'alta'", () => {
      expect(calcularPuntajeComplejidad("alta")).toBe(12);
  });

  it("Debería retornar 8 si la complejidad es 'muy alta'", () => {
      expect(calcularPuntajeComplejidad("muy alta")).toBe(8);
  });

  it("Debería retornar 0 si la complejidad no es ninguna de las anteriores", () => {
      expect(calcularPuntajeComplejidad("media")).toBe(0);
  });

});

describe("calcularPromedioPuntajeDePruebas", () => {
  it("Debería retornar 0 si los puntajes de pruebas es NaN", () => {
      const metricas = [
          { pruebasAñadidas: NaN },
          { pruebasAñadidas: NaN },
      ];
      expect(calcularPromedioPuntajeDePruebas(metricas)).toBe(0);
  });
});


describe("calcularPromedioPuntajeDeLineas", () => {
  it("Debería retornar 0 si los puntajes de líneas de código es NaN", () => {
      const metricas = [
          { lineasDeCodigo: NaN },
          { lineasDeCodigo: NaN },
      ];
      expect(calcularPromedioPuntajeDeLineas(metricas)).toBe(0);
  });
});

describe("calcularPromedioPuntajeDeCobertura", () => {
  it("Debería retornar 0 si los puntajes de cobertura es NaN", () => {
      const metricas = [
          { cobertura: NaN },
          { cobertura: NaN },
      ];
      expect(calcularPromedioPuntajeDeCobertura(metricas)).toBe(0);
  });
});

describe("calcularPromedioPuntajeDeFrecuencia", () => {
  it("Debería retornar 0 si los valores de fecha/hora es NaN", () => {
      const metricas = [
          { fechaHora: NaN },
          { fechaHora: NaN },
      ];
      expect(calcularPromedioPuntajeDeFrecuencia(metricas)).toBe(0);
  });
});

describe("calcularPromedioPuntajeDeComplejidad", () => {
  it("Debería calcular correctamente el puntaje promedio de complejidad", () => {
      const metricas = [
          { complejidad: "baja" },
          { complejidad: "alta" },
          { complejidad: "moderada" },
      ];
      expect(calcularPromedioPuntajeDeComplejidad(metricas)).toBe(16);
  });

});

describe("calcularPromedioPuntajeDeFrecuencia", () => {
  it("Debería retornar 0 si el arreglo de métricas está vacío", () => {
      const metricas = [];
      expect(calcularPromedioPuntajeDeFrecuencia(metricas)).toBe(0);
  });
});

describe("procesarArchivoDeMetricas", () => {
  it("Debería procesar correctamente el contenido del archivo y devolver un arreglo de métricas", () => {
      const contenido = "10, 200, 80, 2024-05-01 10:00, baja\n5, 150, 70, 2024-05-02 15:30, moderada\n";
      const proyecto = { metricas: [] };
      const metricas = procesarArchivoDeMetricas(contenido, proyecto);
      expect(metricas).toHaveLength(2);
      expect(metricas[0]).toEqual({
          pruebasAñadidas: 10,
          lineasDeCodigo: 200,
          cobertura: 80,
          fechaHora: "2024-05-01 10:00",
          complejidad: "baja"
      });
      expect(metricas[1]).toEqual({
          pruebasAñadidas: 5,
          lineasDeCodigo: 150,
          cobertura: 70,
          fechaHora: "2024-05-02 15:30",
          complejidad: "moderada"
      });
      expect(proyecto.metricas).toHaveLength(2);
  });

  it("Debería manejar correctamente las líneas vacías en el contenido", () => {
      const contenido = "10, 200, 80, 2024-05-01 10:00, baja\n\n5, 150, 70, 2024-05-02 15:30, moderada\n";
      const proyecto = { metricas: [] };
      const metricas = procesarArchivoDeMetricas(contenido, proyecto);
      expect(metricas).toHaveLength(2);
      expect(metricas[0]).toEqual({
          pruebasAñadidas: 10,
          lineasDeCodigo: 200,
          cobertura: 80,
          fechaHora: "2024-05-01 10:00",
          complejidad: "baja"
      });
      expect(metricas[1]).toEqual({
          pruebasAñadidas: 5,
          lineasDeCodigo: 150,
          cobertura: 70,
          fechaHora: "2024-05-02 15:30",
          complejidad: "moderada"
      });
      expect(proyecto.metricas).toHaveLength(2);
  });

  it("Debería manejar correctamente el contenido vacío", () => {
      const contenido = "";
      const proyecto = { metricas: [] };
      const metricas = procesarArchivoDeMetricas(contenido, proyecto);
      expect(metricas).toHaveLength(0);
      expect(proyecto.metricas).toHaveLength(0);
  });
});


describe('obtenerDescripcionPromedio', () => {
  test('Debería retornar "Excelente" para un puntaje entre 16 y 20', () => {
    const puntaje = 18;
    expect(obtenerDescripcionPromedio(puntaje)).toBe('Excelente');
  });

  test('Debería retornar "Bueno" para un puntaje entre 12 y 16', () => {
    const puntaje = 14;
    expect(obtenerDescripcionPromedio(puntaje)).toBe('Bueno');
  });

  test('Debería retornar "Regular" para un puntaje entre 8 y 12', () => {
    const puntaje = 10;
    expect(obtenerDescripcionPromedio(puntaje)).toBe('Regular');
  });

  test('Debería retornar "Deficiente" para un puntaje menor o igual a 8', () => {
    const puntaje = 7;
    expect(obtenerDescripcionPromedio(puntaje)).toBe('Deficiente');
  });
}); 