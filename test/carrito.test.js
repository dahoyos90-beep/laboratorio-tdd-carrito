// ============================================================
// ARCHIVO: test/carrito.test.js
// PROPÓSITO: Pruebas unitarias del carrito de compras (TDD).
// ESTADO ACTUAL: Reto B — VERDE (pruebas antiguas ajustadas
// al nuevo total con envío).
// ============================================================

// --- Importación de herramientas de prueba nativas de Node.js ---
import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// --- Importación de la clase que vamos a probar ---
import { Carrito } from '../src/carrito.js';

// ============================================================
// GRUPO PRINCIPAL: Carrito de compras
// Contiene todas las iteraciones del taller y los retos.
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
  // ITERACIÓN 5: ELIMINAR PRODUCTOS  [ESTADO: VERDE]
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
  // ITERACIÓN 6: CUPONES DE DESCUENTO  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 6: cupones de descuento', () => {
    // Prueba 6.1: sin cupón el descuento es 0.
    test('sin cupón el descuento es 0', () => {
      carrito.agregar('Teclado', 200000, 1);
      assert.equal(carrito.descuento(), 0);
    });

    // Prueba 6.2: DESC10 descuenta el 10 % del subtotal.
    test('el cupón DESC10 descuenta el 10 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC10');
      assert.equal(carrito.descuento(), 20000);
    });

    // Prueba 6.3: DESC20 descuenta el 20 % del subtotal.
    test('el cupón DESC20 descuenta el 20 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC20');
      assert.equal(carrito.descuento(), 40000);
    });

    // Prueba 6.4: un cupón inexistente lanza un error.
    test('un cupón inexistente lanza un error', () => {
      assert.throws(() => carrito.aplicarCupon('GRATIS'), /no es válido/);
    });
  });

  // ============================================================
  // ITERACIÓN 7: IVA Y TOTAL A PAGAR  [ESTADO: VERDE — AJUSTADO]
  // NOTA: el total ahora incluye envío (Reto B). Se ajustan los
  // valores esperados de las pruebas 7.1, 7.2 y 7.3.
  // ============================================================
  describe('Iteración 7: IVA y total a pagar', () => {
    // Prueba 7.1: sin cupón, el IVA es el 19 % del subtotal.
    // Base 100.000 < 150.000 → envío 12.000.
    // total = 100.000 + 19.000 + 12.000 = 131.000.
    test('el IVA es el 19 % del subtotal cuando no hay cupón', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.iva(), 19000);
      assert.equal(carrito.total(), 131000);
    });

    // Prueba 7.2: con cupón, el IVA se calcula sobre la base
    // gravable. Base 90.000 < 150.000 → envío 12.000.
    // total = 90.000 + 17.100 + 12.000 = 119.100.
    test('el IVA se calcula sobre el valor con descuento', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.aplicarCupon('DESC10');

      assert.equal(carrito.iva(), 17100);
      assert.equal(carrito.total(), 119100);
    });

    // Prueba 7.3: un carrito vacío tiene total 0.
    // Base 0 < 150.000 → envío 12.000. total = 0 + 0 + 0 + 12.000.
    // Ajustado: el envío aplica incluso con carrito vacío (base 0).
    test('un carrito vacío tiene total 12000 (solo envío)', () => {
      assert.equal(carrito.total(), 12000);
    });
  });

  // ============================================================
  // RETO A: RESUMEN DE LA COMPRA  [ESTADO: VERDE — AJUSTADO]
  // NOTA: el total ahora incluye envío (Reto B). Se ajusta el
  // valor esperado del total.
  // Base 90.000 < 150.000 → envío 12.000 → total 119.100.
  // ============================================================
  describe('Reto A: resumen de la compra', () => {
    test('resumen devuelve todos los valores de la compra', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.aplicarCupon('DESC10');

      assert.deepEqual(carrito.resumen(), {
        subtotal: 100000,
        descuento: 10000,
        iva: 17100,
        total: 119100,
      });
    });
  });

  // ============================================================
  // RETO B: COSTO DE ENVÍO  [ESTADO: VERDE]
  // ============================================================
  describe('Reto B: costo de envío', () => {
    // Prueba B.1: base gravable menor a 150.000 → envío 12.000.
    test('el envío cuesta 12.000 cuando la base es menor a 150.000', () => {
      carrito.agregar('Mouse', 100000, 1);

      assert.equal(carrito.baseGravable(), 100000);
      assert.equal(carrito.envio(), 12000);
    });

    // Prueba B.2: base exactamente 150.000 → envío gratis (límite).
    test('el envío es gratis cuando la base es exactamente 150.000', () => {
      carrito.agregar('Teclado', 150000, 1);

      assert.equal(carrito.baseGravable(), 150000);
      assert.equal(carrito.envio(), 0);
    });

    // Prueba B.3: base mayor a 150.000 → envío gratis.
    test('el envío es gratis cuando la base supera 150.000', () => {
      carrito.agregar('Monitor', 200000, 1);

      assert.equal(carrito.baseGravable(), 200000);
      assert.equal(carrito.envio(), 0);
    });

    // Prueba B.4: el total incluye el envío sin IVA.
    // 1 × 100.000 = 100.000; IVA 19.000; envío 12.000;
    // total = 100.000 + 19.000 + 12.000 = 131.000.
    test('el total incluye el envío sin IVA', () => {
      carrito.agregar('Mouse', 100000, 1);

      assert.equal(carrito.iva(), 19000);
      assert.equal(carrito.envio(), 12000);
      assert.equal(carrito.total(), 131000);
    });
  });

  // ============================================================
  // (Aquí se pegarán los siguientes retos)
  // ============================================================
});