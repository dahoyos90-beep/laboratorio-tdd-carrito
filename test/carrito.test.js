// ============================================================
// ARCHIVO: test/carrito.test.js
// PROPÓSITO: Pruebas unitarias del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 1 — ROJO (las pruebas deben fallar).
// ============================================================

// --- Importación de herramientas de prueba nativas de Node.js ---
import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// --- Importación de la clase que vamos a probar ---
import { Carrito } from '../src/carrito.js';

// ============================================================
// GRUPO PRINCIPAL: Carrito de compras
// Contiene todas las iteraciones del taller.
// ============================================================
describe('Carrito de compras', () => {
  // Variable que se reinicia antes de cada prueba para evitar
  // dependencias entre pruebas (aislamiento).
  let carrito;

  // beforeEach: crea un carrito nuevo antes de cada test.
  beforeEach(() => {
    carrito = new Carrito();
  });

  // ============================================================
  // ITERACIÓN 1: CARRITO VACÍO  [ESTADO: ROJO]
  // Requisito: un carrito recién creado no tiene ítems
  // y su subtotal es 0.
  //
  // RESULTADO ESPERADO AL EJECUTAR npm test:
  //   ✖ un carrito nuevo no tiene ítems
  //   ✖ un carrito nuevo tiene subtotal 0
  //   tests 2 | pass 0 | fail 2
  //
  // ERROR ESPERADO:
  //   TypeError: carrito.cantidadDeItems is not a function
  //   TypeError: carrito.subtotal is not a function
  // ============================================================
  describe('Iteración 1: carrito vacío', () => {
    // Prueba 1.1: el carrito nuevo debe tener 0 ítems.
    test('un carrito nuevo no tiene ítems', () => {
      assert.equal(carrito.cantidadDeItems(), 0);
    });

    // Prueba 1.2: el carrito nuevo debe tener subtotal 0.
    test('un carrito nuevo tiene subtotal 0', () => {
      assert.equal(carrito.subtotal(), 0);
    });
  });

  // ============================================================
  // (Aquí se pegarán las siguientes iteraciones)
  // ============================================================
});