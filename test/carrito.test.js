// ============================================================
// ARCHIVO: test/carrito.test.js
// PROPÓSITO: Pruebas unitarias del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 5 — ROJO (las pruebas nuevas deben fallar).
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
  // ITERACIÓN 3: PRODUCTO REPETIDO  [ESTADO: VERDE]
  // RESULTADO ESPERADO: tests 6 | pass 6 | fail 0
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
  // ITERACIÓN 4: VALIDACIONES  [ESTADO: VERDE]
  // RESULTADO ESPERADO: tests 8 | pass 8 | fail 0
  // ============================================================
  describe('Iteración 4: validaciones', () => {
    // Prueba 4.1: rechaza precios negativos o en cero.
    test('no permite precios negativos o en cero', () => {
      assert.throws(() => carrito.agregar('Mouse', -100, 1), /precio/);
      assert.throws(() => carrito.agregar('Mouse', 0, 1), /precio/);
    });

    // Prueba 4.2: rechaza cantidades en cero, negativas o decimales.
    test('no permite cantidades en cero, negativas o decimales', () => {
      assert.throws(() => carrito.agregar('Mouse', 50000, 0), /cantidad/);
      assert.throws(() => carrito.agregar('Mouse', 50000, -1), /cantidad/);
      assert.throws(() => carrito.agregar('Mouse', 50000, 1.5), /cantidad/);
    });
  });

  // ============================================================
  // ITERACIÓN 5: ELIMINAR PRODUCTOS  [ESTADO: ROJO]
  // Requisito: se puede quitar un producto del carrito por su
  // nombre. Si el producto no existe, se lanza un error.
  //
  // RESULTADO ESPERADO AL EJECUTAR npm test:
  //   ✖ eliminar un producto lo quita del carrito
  //   ✖ eliminar un producto que no existe lanza un error
  //   tests 10 | pass 8 | fail 2
  //
  // ERROR ESPERADO:
  //   TypeError: carrito.eliminar is not a function
  //   AssertionError: The input did not match the regular
  //   expression /no está en el carrito/
  // ============================================================
  describe('Iteración 5: eliminar productos', () => {
    // Prueba 5.1: eliminar un producto lo quita del carrito
    // y actualiza cantidad y subtotal.
    test('eliminar un producto lo quita del carrito', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      carrito.eliminar('Mouse');

      assert.equal(carrito.cantidadDeItems(), 1);
      assert.equal(carrito.subtotal(), 120000);
    });

    // Prueba 5.2: eliminar un producto que no existe lanza error.
    test('eliminar un producto que no existe lanza un error', () => {
      assert.throws(() => carrito.eliminar('Monitor'), /no está en el carrito/);
    });
  });

  // ============================================================
  // (Aquí se pegarán las siguientes iteraciones)
  // ============================================================
});