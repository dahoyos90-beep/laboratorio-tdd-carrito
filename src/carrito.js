// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 2 — VERDE (lógica real con arreglo).
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
// Requisito: al agregar productos, el carrito cuenta las
// unidades y calcula el subtotal (precio × cantidad).
// Si no se indica la cantidad, se asume 1.
//
// TÉCNICA: "Triangulación". Las pruebas exigen lógica real,
// así que reemplazamos los valores fijos por:
//   - un arreglo this.productos que guarda cada producto.
//   - reduce para sumar cantidades y precios × cantidad.
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ agregar un producto actualiza cantidad y subtotal
//   ✔ agregar varios productos suma todos los subtotales
//   ✔ si no se indica cantidad, se agrega una unidad
//   ✔ (las 2 pruebas de la Iteración 1 siguen en verde)
//   tests 5 | pass 5 | fail 0
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
  // Agrega un producto al carrito con su nombre, precio y
  // cantidad. Si no se indica cantidad, se asume 1.
  // Iteración 2: solo inserta en el arreglo (sin validaciones
  // ni acumulación; eso vendrá en iteraciones posteriores).
  // ----------------------------------------------------------
  agregar(nombre, precio, cantidad = 1) {
    this.productos.push({ nombre, precio, cantidad });
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