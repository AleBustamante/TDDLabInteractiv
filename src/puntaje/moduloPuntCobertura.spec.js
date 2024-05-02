import puntajePorCobertura from "./moduloPuntCobertura";

describe("calcularPuntajePorCobertura", () => {
  it("Cuando se instancia un objeto Puntaje, todos los puntajes deberían estar en 0", () => {
    expect(puntajePorCobertura(0)).toEqual(0);
  });
  it("Debería otorgar un puntaje de 0 cuando la cobertura de codigo fue del 0%", () => {
    expect(puntajePorCobertura(0)).toEqual(0);
  });
  it("Debería otorgar un puntaje de 100 cuando la cobertura de codigo fue del 100%", () => {
    expect(puntajePorCobertura(100)).toEqual(100);
  });
  it("Debería otorgar un puntaje de 100 cuando la cobertura de codigo fue del 100%", () => {
    expect(puntajePorCobertura(100)).toEqual(100);
  });
  it("Debería otorgar un puntaje proporcional al logaritmo en base 10%", () => {
    expect(puntajePorCobertura(40)).toEqual(60);
  });
});