// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 4 — VERDE (agrega validaciones).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CLASE: Carrito
// Representa el carrito de compras del cliente.
//
// ITERACIÓN 1: CARRITO VACÍO  [ESTADO: VERDE]
//   - cantidadDeItems() y subtotal() devolvían 0 (fake it).
//
// ITERACIÓN 2: AGREGAR PRODUCTOS  [ESTADO: VERDE]
//   - constructor con this.productos = [].
//   - agregar() inserta en el arreglo.
//   - cantidadDeItems() y subtotal() usan reduce.
//
// ITERACIÓN 3: PRODUCTO REPETIDO  [ESTADO: VERDE]
//   - agregar() busca con .find() y acumula cantidad si existe.
//
// ITERACIÓN 4: VALIDACIONES  [ESTADO: VERDE]
// Requisito: no se aceptan precios menores o iguales a 0,
// ni cantidades que no sean enteros positivos.
//
// TÉCNICA: Al inicio de agregar(), se valida:
//   - precio: debe ser número y > 0. Si no, throw Error con 'precio'.
//   - cantidad: debe ser entero y > 0. Si no, throw Error con 'cantidad'.
// Las pruebas usan assert.throws(fn, /precio/) y /cantidad/ para
// verificar que el mensaje del error contenga esa palabra.
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ no permite precios negativos o en cero
//   ✔ no permite cantidades en cero, negativas o decimales
//   ✔ (las 6 pruebas anteriores siguen en verde)
//   tests 8 | pass 8 | fail 0
// ============================================================
export class Carrito {
  // ----------------------------------------------------------
  // CONSTRUCTOR
  // Inicializa el arreglo de productos. Cada producto será un
  // objeto { nombre, precio, cantidad }.
  // ----------------------------------------------------------
  constructor() {
    this.productos = [];
  }

  // ----------------------------------------------------------
  // MÉTODO: agregar(nombre, precio, cantidad)
  // Agrega un producto al carrito. Si no se indica cantidad,
  // se asume 1.
  //
  // Iteración 4: antes de insertar o acumular, valida:
  //   - precio debe ser número y mayor que 0.
  //   - cantidad debe ser entero y mayor que 0.
  // Si alguna validación falla, lanza un Error con mensaje
  // que contiene 'precio' o 'cantidad' (para que las pruebas
  // con assert.throws(fn, /regex/) lo detecten).
  //
  // Iteración 3: si el producto ya existe por nombre, acumula
  // la cantidad; si no, lo inserta como nuevo.
  // ----------------------------------------------------------
  agregar(nombre, precio, cantidad = 1) {
    // --- Validación de precio (Iteración 4) ---
    if (typeof precio !== 'number' || precio <= 0) {
      throw new Error('El precio debe ser mayor que cero');
    }

    // --- Validación de cantidad (Iteración 4) ---
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad debe ser un entero positivo');
    }

    // --- Acumulación o inserción (Iteración 3) ---
    const existente = this.productos.find((p) => p.nombre === nombre);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.productos.push({ nombre, precio, cantidad });
    }
  }

  // ----------------------------------------------------------
  // MÉTODO: cantidadDeItems()
  // Devuelve el número total de unidades en el carrito,
  // sumando la cantidad de cada producto con reduce.
  // ----------------------------------------------------------
  cantidadDeItems() {
    return this.productos.reduce((suma, p) => suma + p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: subtotal()
  // Devuelve la suma de precio × cantidad de los productos
  // usando reduce.
  // ----------------------------------------------------------
  subtotal() {
    return this.productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  }
}