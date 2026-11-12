// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 5 — VERDE (agrega eliminar producto).
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
//   - agregar() valida precio > 0 (number) y cantidad entero > 0.
//
// ITERACIÓN 5: ELIMINAR PRODUCTOS  [ESTADO: VERDE]
// Requisito: se puede quitar un producto del carrito por su
// nombre. Si el producto no existe, se lanza un error.
//
// TÉCNICA: eliminar(nombre) usa findIndex() para localizar el
// producto por nombre. Si el indice es -1, lanza Error con
// mensaje que contiene 'no está en el carrito'. Si existe,
// lo quita con splice(indice, 1).
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ eliminar un producto lo quita del carrito
//   ✔ eliminar un producto que no existe lanza un error
//   ✔ (las 8 pruebas anteriores siguen en verde)
//   tests 10 | pass 10 | fail 0
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
  // Iteración 4: valida precio y cantidad antes de insertar.
  // Iteración 3: acumula cantidad si el producto ya existe.
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
  // MÉTODO: eliminar(nombre)
  // Quita un producto del carrito por su nombre.
  // Si el producto no existe, lanza un Error cuyo mensaje
  // contiene 'no está en el carrito'.
  // Iteración 5: implementación inicial con findIndex y splice.
  // ----------------------------------------------------------
  eliminar(nombre) {
    const indice = this.productos.findIndex((p) => p.nombre === nombre);

    if (indice === -1) {
      throw new Error(`El producto "${nombre}" no está en el carrito`);
    }

    this.productos.splice(indice, 1);
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