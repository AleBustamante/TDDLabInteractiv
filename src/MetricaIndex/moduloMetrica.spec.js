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

    it("Deberia devolver 10 puntos para puntaje de pruebas para pruebas <=10", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajePruebas(10)).toBe(10);
    });

    it("Deberia devolver 8 puntos para puntaje de pruebas para pruebas <=20", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajePruebas(20)).toBe(8);
    });

    it("Deberia devolver 5 puntos para puntaje de pruebas para pruebas mayores a 21", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajePruebas(30)).toBe(5);
    });

    
    it("Deberia devolver una descripcion para 7 pruebas", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionPruebas(7)).toBe("Bueno: Se han realizado pruebas adecuadas, pero pueden ser mejoradas para una cobertura más completa.");
    });

    it("Deberia devolver una descripcion para 4 pruebas", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionPruebas(4)).toBe("Insuficiente: La cantidad de pruebas realizadas es baja, lo que puede afectar la calidad del código.");
    });

    it("Deberia devolver una descripcion de las lineas, para puntaje de lineas 7 ", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionLineas(4)).toBe("Demasiado grande: El código es demasiado extenso, lo que puede dificultar su mantenimiento y comprensión.");
    });

    it("Deberia devolver una descripcion de cobertura, para puntaje de cobertura 4 ", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionCobertura(4)).toBe("Insuficiente: La cobertura de pruebas es baja, lo que deja áreas críticas sin suficiente protección.");
    });

    it("Deberia devolver una descripcion de puntaje total, para puntaje total de 20 ", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionTotal(20)).toBe("Buen trabajo, el proyecto tiene un nivel aceptable de calidad.");
    });
    it("Deberia devolver una descripcion de puntaje total, para puntaje total de 15 ", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionTotal(15)).toBe("El proyecto necesita mejoras para alcanzar un nivel adecuado de calidad.");
    });

    it("Deberia devolver una descripcion de puntaje total, para puntaje total de 5 ", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.obtenerDescripcionTotal(5)).toBe("Se requieren mejoras significativas, el proyecto tiene un bajo nivel de calidad.");
    });

    //5ta HU Ale
    it("Deberia devolver un puntaje de 8 para complejidad Deficiente", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("Deficiente")).toBe(8);
    });

    it("Deberia devolver un puntaje de 12 para complejidad Regular", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("Regular")).toBe(12);
    });

    it("Deberia devolver un puntaje de 16 para complejidad Bueno", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("Bueno")).toBe(16);
    });

    it("Deberia devolver un puntaje de 20 para complejidad Excelente", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("Excelente")).toBe(20);
    });

    it("Debería ser insensible a mayúsculas y minúsculas", () => {
      expect(metrica.calcularPuntajeComplejidad("Deficiente")).toBe(8);
      expect(metrica.calcularPuntajeComplejidad("Regular")).toBe(12);
      expect(metrica.calcularPuntajeComplejidad("Bueno")).toBe(16);
      expect(metrica.calcularPuntajeComplejidad("Excelente")).toBe(20);
    });

    it("Deberia devolver un puntaje de 8 para complejidad Deficiente ignorando mayusculas", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("DeFicIEnTe")).toBe(8);
    });

    it("Deberia devolver un puntaje de 12 para complejidad Regular ignorando mayusculas", () => {
      metrica=new Metrica(10,10,100);
      expect(metrica.calcularPuntajeComplejidad("ReguLAR")).toBe(12);
    });
    
});