// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 6 — VERDE (agrega cupones).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CONSTANTE: CUPONES
// Diccionario de cupones válidos y su porcentaje de descuento.
// Se define fuera de la clase para que agregar un cupón nuevo
// sea una línea más y no un if más (según el PDF).
// ------------------------------------------------------------
//   DESC10 → 10 % de descuento
//   DESC20 → 20 % de descuento
// ============================================================
const CUPONES = {
  DESC10: 0.10,
  DESC20: 0.20,
};

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
//   - eliminar() usa findIndex + splice; error si no existe.
//
// ITERACIÓN 6: CUPONES DE DESCUENTO  [ESTADO: VERDE]
// Requisito: los cupones DESC10 y DESC20 descuentan el 10 %
// y el 20 % del subtotal. Un cupón desconocido es un error.
//
// TÉCNICA: Se usa un objeto CUPONES fuera de la clase. El
// carrito guarda el código aplicado en this.cupon. El descuento
// se calcula con Math.round (sin decimales, según el PDF).
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ sin cupón el descuento es 0
//   ✔ el cupón DESC10 descuenta el 10 % del subtotal
//   ✔ el cupón DESC20 descuenta el 20 % del subtotal
//   ✔ un cupón inexistente lanza un error
//   ✔ (las 10 pruebas anteriores siguen en verde)
//   tests 14 | pass 14 | fail 0
// ============================================================
export class Carrito {
  // ----------------------------------------------------------
  // CONSTRUCTOR
  // Inicializa el arreglo de productos y el cupón aplicado.
  // this.cupon = null significa que no hay cupón aplicado.
  // ----------------------------------------------------------
  constructor() {
    this.productos = [];
    this.cupon = null;
  }

  // ----------------------------------------------------------
  // MÉTODO: agregar(nombre, precio, cantidad)
  // Agrega un producto al carrito con validaciones y
  // acumulación de cantidad si ya existe.
  // (Iteraciones 2, 3 y 4)
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
  // (Iteración 5)
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
  // Devuelve el número total de unidades en el carrito.
  // (Iteración 2)
  // ----------------------------------------------------------
  cantidadDeItems() {
    return this.productos.reduce((suma, p) => suma + p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: subtotal()
  // Devuelve la suma de precio × cantidad de los productos.
  // (Iteración 2)
  // ----------------------------------------------------------
  subtotal() {
    return this.productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: aplicarCupon(codigo)
  // Guarda el código de cupón si es válido.
  // Si el código no está en CUPONES, lanza Error con mensaje
  // que contiene 'no es válido'.
  // (Iteración 6)
  // ----------------------------------------------------------
  aplicarCupon(codigo) {
    if (!(codigo in CUPONES)) {
      throw new Error(`El cupón "${codigo}" no es válido`);
    }
    this.cupon = codigo;
  }

  // ----------------------------------------------------------
  // MÉTODO: descuento()
  // Devuelve el valor del descuento en pesos colombianos.
  // Si no hay cupón aplicado, devuelve 0.
  // Usa Math.round para no tener decimales (COP).
  // (Iteración 6)
  // ----------------------------------------------------------
  descuento() {
    if (!this.cupon) return 0;
    return Math.round(this.subtotal() * CUPONES[this.cupon]);
  }
}