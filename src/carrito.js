// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 7 — VERDE (agrega IVA y total).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CONSTANTE: IVA
// Porcentaje de IVA aplicable en Colombia.
// Se define fuera de la clase para facilitar cambiarlo en el
// futuro (una sola línea).
// ============================================================
const IVA = 0.19;

// ============================================================
// CONSTANTE: CUPONES
// Diccionario de cupones válidos y su porcentaje de descuento.
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
//   - CUPONES fuera de la clase; aplicarCupon() y descuento().
//
// ITERACIÓN 7: IVA Y TOTAL A PAGAR  [ESTADO: VERDE]
// Requisito: el IVA es del 19 % y se calcula sobre el subtotal
// menos el descuento. El total es esa base más el IVA.
//
// TÉCNICA: Se agrega la constante IVA = 0.19 fuera de la clase.
//   - iva(): Math.round((subtotal - descuento) * IVA).
//   - total(): subtotal - descuento + iva.
// Math.round se usa para no tener decimales (COP), según el PDF.
//
// EJEMPLO (2 × 50.000 con DESC10):
//   subtotal 100.000 - descuento 10.000 = base 90.000
//   iva = 90.000 × 0.19 = 17.100
//   total = 90.000 + 17.100 = 107.100
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ el IVA es el 19 % del subtotal cuando no hay cupón
//   ✔ el IVA se calcula sobre el valor con descuento
//   ✔ un carrito vacío tiene total 0
//   ✔ (las 14 pruebas anteriores siguen en verde)
//   tests 17 | pass 17 | fail 0
// ============================================================
export class Carrito {
  // ----------------------------------------------------------
  // CONSTRUCTOR
  // Inicializa el arreglo de productos y el cupón aplicado.
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
  // (Iteración 6)
  // ----------------------------------------------------------
  descuento() {
    if (!this.cupon) return 0;
    return Math.round(this.subtotal() * CUPONES[this.cupon]);
  }

  // ----------------------------------------------------------
  // MÉTODO: iva()
  // Devuelve el IVA (19 %) calculado sobre la base gravable
  // (subtotal - descuento). Redondeado a pesos colombianos.
  // (Iteración 7)
  // ----------------------------------------------------------
  iva() {
    return Math.round((this.subtotal() - this.descuento()) * IVA);
  }

  // ----------------------------------------------------------
  // MÉTODO: total()
  // Devuelve el total a pagar: base gravable + IVA.
  // (Iteración 7)
  // ----------------------------------------------------------
  total() {
    return this.subtotal() - this.descuento() + this.iva();
  }
}