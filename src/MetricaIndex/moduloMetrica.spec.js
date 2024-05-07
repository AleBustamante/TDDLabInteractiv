import { crearMetrica,agregarMetricaAProyecto , eliminarMetricaDeProyecto, modificarMetrica} from "./moduloMetrica.js";
import Metrica from "../Metrica.js"; 
import Proyecto from "../Proyecto.js"; 
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

describe("crearMetrica", () => {
  it("Debería crear una nueva instancia de Metrica con los valores dados (no refactor)", () => {
    const metrica = crearMetrica(10, 100, 80);
    expect(metrica).toBeInstanceOf(Metrica);
    expect(metrica.pruebasAñadidas).toBe(10);
    expect(metrica.lineasDeCodigo).toBe(100);
    expect(metrica.cobertura).toBe(80);
  });

  it("Debería manejar valores nulos o indefinidos", () => {
    const metrica = crearMetrica(null, undefined, 50);
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(50);
  });

  it("Debería manejar valores negativos", () => {
    const metrica = crearMetrica(-5, -50, -20);
    expect(metrica.pruebasAñadidas).toBe(0);
    expect(metrica.lineasDeCodigo).toBe(0);
    expect(metrica.cobertura).toBe(0);
  });

  it("Debería limitar los valores a un máximo de 100", () => {
    const metrica = crearMetrica(200, 150, 120);
    expect(metrica).toBeNull();
  });

  it("Debería mostrar un mensaje si los valores superan 100", () => {
    console.log = jest.fn(); 
    crearMetrica(200, 150, 120);
    expect(console.log).toHaveBeenCalledWith("Ponga un valor real porfavor");
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
  describe("modificarMetrica", () => {
    it("Debería modificar los valores de la métrica según los nuevos datos proporcionados", () => {
      const metrica = new Metrica(15, 150, 90);
      modificarMetrica(metrica, 15, 150, 90);
      expect(metrica.pruebasAñadidas).toBe(15);
      expect(metrica.lineasDeCodigo).toBe(150);
      expect(metrica.cobertura).toBe(90);
    });
  });
 
/*
  describe("mostrarMetricas", () => {
    it("Debería eliminar todas las métricas actuales del proyectoElement", () => {
      const proyectoElement = document.createElement("div");
      proyectoElement.innerHTML = '<div class="metrica"></div><div class="metrica"></div>';
      //proyectoElement.innerHTML = <div class="metrica"></div><div class="metrica"></div>;
      mostrarMetricas(null, proyectoElement); 
      expect(proyectoElement.querySelectorAll(".metrica").length).toBe(0);
    });
  });
   */
});   

