// ============================================================
// ARCHIVO: test/carrito.test.js
// PROPÓSITO: Pruebas unitarias del carrito de compras (TDD).
// ESTADO ACTUAL: Reto C — ROJO (las pruebas nuevas deben fallar).
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
  let carrito;

  beforeEach(() => {
    carrito = new Carrito();
  });

  // ============================================================
  // ITERACIÓN 1: CARRITO VACÍO  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 1: carrito vacío', () => {
    test('un carrito nuevo no tiene ítems', () => {
      assert.equal(carrito.cantidadDeItems(), 0);
    });

    test('un carrito nuevo tiene subtotal 0', () => {
      assert.equal(carrito.subtotal(), 0);
    });
  });

  // ============================================================
  // ITERACIÓN 2: AGREGAR PRODUCTOS  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 2: agregar productos', () => {
    test('agregar un producto actualiza cantidad y subtotal', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.cantidadDeItems(), 2);
      assert.equal(carrito.subtotal(), 100000);
    });

    test('agregar varios productos suma todos los subtotales', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      assert.equal(carrito.cantidadDeItems(), 3);
      assert.equal(carrito.subtotal(), 220000);
    });

    test('si no se indica cantidad, se agrega una unidad', () => {
      carrito.agregar('Audifonos', 80000);

      assert.equal(carrito.cantidadDeItems(), 1);
    });
  });

  // ============================================================
  // ITERACIÓN 3: PRODUCTO REPETIDO  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 3: producto repetido', () => {
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
    test('no permite precios negativos o en cero', () => {
      assert.throws(() => carrito.agregar('Mouse', -100, 1), /precio/);
      assert.throws(() => carrito.agregar('Mouse', 0, 1), /precio/);
    });

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
    test('eliminar un producto lo quita del carrito', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      carrito.eliminar('Mouse');

      assert.equal(carrito.cantidadDeItems(), 1);
      assert.equal(carrito.subtotal(), 120000);
    });

    test('eliminar un producto que no existe lanza un error', () => {
      assert.throws(() => carrito.eliminar('Monitor'), /no está en el carrito/);
    });
  });

  // ============================================================
  // ITERACIÓN 6: CUPONES DE DESCUENTO  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 6: cupones de descuento', () => {
    test('sin cupón el descuento es 0', () => {
      carrito.agregar('Teclado', 200000, 1);
      assert.equal(carrito.descuento(), 0);
    });

    test('el cupón DESC10 descuenta el 10 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC10');
      assert.equal(carrito.descuento(), 20000);
    });

    test('el cupón DESC20 descuenta el 20 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC20');
      assert.equal(carrito.descuento(), 40000);
    });

    test('un cupón inexistente lanza un error', () => {
      assert.throws(() => carrito.aplicarCupon('GRATIS'), /no es válido/);
    });
  });

  // ============================================================
  // ITERACIÓN 7: IVA Y TOTAL A PAGAR  [ESTADO: VERDE]
  // ============================================================
  describe('Iteración 7: IVA y total a pagar', () => {
    test('el IVA es el 19 % del subtotal cuando no hay cupón', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.iva(), 19000);
      assert.equal(carrito.total(), 131000);
    });

    test('el IVA se calcula sobre el valor con descuento', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.aplicarCupon('DESC10');

      assert.equal(carrito.iva(), 17100);
      assert.equal(carrito.total(), 119100);
    });

    test('un carrito vacío tiene total 12000 (solo envío)', () => {
      assert.equal(carrito.total(), 12000);
    });
  });

  // ============================================================
  // RETO A: RESUMEN DE LA COMPRA  [ESTADO: VERDE]
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
    test('el envío cuesta 12.000 cuando la base es menor a 150.000', () => {
      carrito.agregar('Mouse', 100000, 1);

      assert.equal(carrito.baseGravable(), 100000);
      assert.equal(carrito.envio(), 12000);
    });

    test('el envío es gratis cuando la base es exactamente 150.000', () => {
      carrito.agregar('Teclado', 150000, 1);

      assert.equal(carrito.baseGravable(), 150000);
      assert.equal(carrito.envio(), 0);
    });

    test('el envío es gratis cuando la base supera 150.000', () => {
      carrito.agregar('Monitor', 200000, 1);

      assert.equal(carrito.baseGravable(), 200000);
      assert.equal(carrito.envio(), 0);
    });

    test('el total incluye el envío sin IVA', () => {
      carrito.agregar('Mouse', 100000, 1);

      assert.equal(carrito.iva(), 19000);
      assert.equal(carrito.envio(), 12000);
      assert.equal(carrito.total(), 131000);
    });
  });

  // ============================================================
  // RETO C: ACTUALIZAR CANTIDAD  [ESTADO: ROJO]
  // Requisito: actualizarCantidad(nombre, nueva).
  //   - Si nueva === 0 → elimina el producto.
  //   - Si nueva < 0 → lanza error con /cantidad/.
  //   - Si nueva > 0 → actualiza la cantidad.
  //   - Si el producto no existe → lanza error con /no está en el carrito/.
  //
  // RESULTADO ESPERADO AL EJECUTAR npm test:
  //   ✖ actualiza la cantidad de un producto existente
  //   ✖ si la nueva cantidad es 0, elimina el producto
  //   ✖ si la nueva cantidad es negativa, lanza un error
  //   ✖ si el producto no existe, lanza un error
  //   tests 26 | pass 22 | fail 4
  //
  // ERROR ESPERADO:
  //   TypeError: carrito.actualizarCantidad is not a function
  // ============================================================
  describe('Reto C: actualizar cantidad', () => {
    // Prueba C.1: actualiza la cantidad de un producto existente.
    test('actualiza la cantidad de un producto existente', () => {
      carrito.agregar('Mouse', 50000, 2);

      carrito.actualizarCantidad('Mouse', 5);

      assert.equal(carrito.cantidadDeItems(), 5);
      assert.equal(carrito.subtotal(), 250000);
    });

    // Prueba C.2: si la nueva cantidad es 0, elimina el producto.
    test('si la nueva cantidad es 0, elimina el producto', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      carrito.actualizarCantidad('Mouse', 0);

      assert.equal(carrito.cantidadDeItems(), 1);
      assert.equal(carrito.subtotal(), 120000);
    });

    // Prueba C.3: si la nueva cantidad es negativa, lanza error.
    test('si la nueva cantidad es negativa, lanza un error', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.throws(() => carrito.actualizarCantidad('Mouse', -1), /cantidad/);
    });

    // Prueba C.4: si el producto no existe, lanza error.
    test('si el producto no existe, lanza un error', () => {
      assert.throws(
        () => carrito.actualizarCantidad('Monitor', 3),
        /no está en el carrito/
      );
    });
  });

  // ============================================================
  // (Aquí se pegarán los siguientes retos)
  // ============================================================
});