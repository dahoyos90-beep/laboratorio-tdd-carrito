// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 3 — VERDE (acumula producto repetido).
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
// Requisito: si se agrega un producto que ya está en el
// carrito, se acumula la cantidad en la misma línea.
//
// TÉCNICA: En agregar(), se busca el producto existente con
// .find() por nombre. Si existe, se suma la cantidad; si no,
// se inserta uno nuevo. Así no se duplican líneas.
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ agregar el mismo producto acumula la cantidad en una sola línea
//   ✔ (las 5 pruebas anteriores siguen en verde)
//   tests 6 | pass 6 | fail 0
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
  // Iteración 3: antes de insertar, busca si el producto ya
  // existe por nombre. Si existe, acumula la cantidad en la
  // misma línea; si no, lo inserta como nuevo.
  // ----------------------------------------------------------
  agregar(nombre, precio, cantidad = 1) {
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