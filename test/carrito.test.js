// ============================================================
// ARCHIVO: test/carrito.test.js
// PROPÓSITO: Pruebas unitarias del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 3 — ROJO (la prueba nueva debe fallar).
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
  // ITERACIÓN 1: CARRITO VACÍO  [ESTADO: VERDE]
  // Requisito: un carrito recién creado no tiene ítems
  // y su subtotal es 0.
  //
  // RESULTADO ESPERADO: tests 2 | pass 2 | fail 0
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
  // ITERACIÓN 2: AGREGAR PRODUCTOS  [ESTADO: VERDE]
  // Requisito: al agregar productos, el carrito cuenta las
  // unidades y calcula el subtotal (precio × cantidad).
  // Si no se indica la cantidad, se asume 1.
  //
  // RESULTADO ESPERADO: tests 5 | pass 5 | fail 0
  // ============================================================
  describe('Iteración 2: agregar productos', () => {
    // Prueba 2.1: agregar un producto actualiza cantidad y subtotal.
    test('agregar un producto actualiza cantidad y subtotal', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.cantidadDeItems(), 2);
      assert.equal(carrito.subtotal(), 100000);
    });

    // Prueba 2.2: varios productos suman todos los subtotales.
    test('agregar varios productos suma todos los subtotales', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      assert.equal(carrito.cantidadDeItems(), 3);
      assert.equal(carrito.subtotal(), 220000);
    });

    // Prueba 2.3: si no se indica cantidad, se agrega una unidad.
    test('si no se indica cantidad, se agrega una unidad', () => {
      carrito.agregar('Audifonos', 80000);

      assert.equal(carrito.cantidadDeItems(), 1);
    });
  });

  // ============================================================
  // ITERACIÓN 3: PRODUCTO REPETIDO  [ESTADO: ROJO]
  // Requisito: si se agrega un producto que ya está en el
  // carrito, se acumula la cantidad en la misma línea.
  //
  // RESULTADO ESPERADO AL EJECUTAR npm test:
  //   ✖ agregar el mismo producto acumula la cantidad en una sola línea
  //   tests 6 | pass 5 | fail 1
  //
  // ERROR ESPERADO:
  //   AssertionError [ERR_ASSERTION]: Expected values to be
  //   strictly equal: 2 != 1
  //   (porque el carrito tendrá 2 líneas de "Mouse" y la prueba
  //   espera 1).
  // ============================================================
  describe('Iteración 3: producto repetido', () => {
    // Prueba 3.1: agregar el mismo producto acumula la cantidad
    // en una sola línea (no duplica el producto).
    test('agregar el mismo producto acumula la cantidad en una sola línea', () => {
      carrito.agregar('Mouse', 50000, 1);
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.productos.length, 1);
      assert.equal(carrito.cantidadDeItems(), 3);
      assert.equal(carrito.subtotal(), 150000);
    });
  });

  // ============================================================
  // (Aquí se pegarán las siguientes iteraciones)
  // ============================================================
});