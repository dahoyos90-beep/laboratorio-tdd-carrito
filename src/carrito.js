// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Reto A — VERDE (agrega resumen de la compra).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CONSTANTE: IVA
// Porcentaje de IVA aplicable en Colombia.
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
// ITERACIÓN 2: AGREGAR PRODUCTOS  [ESTADO: VERDE]
// ITERACIÓN 3: PRODUCTO REPETIDO  [ESTADO: VERDE]
// ITERACIÓN 4: VALIDACIONES  [ESTADO: VERDE]
// ITERACIÓN 5: ELIMINAR PRODUCTOS  [ESTADO: VERDE]
// ITERACIÓN 6: CUPONES DE DESCUENTO  [ESTADO: VERDE]
// ITERACIÓN 7: IVA Y TOTAL A PAGAR  [ESTADO: VERDE]
//   - Incluye refactor final: baseGravable().
//
// RETO A: RESUMEN DE LA COMPRA  [ESTADO: VERDE]
// Requisito: resumen() devuelve un objeto con subtotal,
// descuento, iva y total.
//
// TÉCNICA: Se agrupan los 4 valores en un objeto literal.
// No hay lógica nueva: reutiliza subtotal(), descuento(),
// iva() y total() ya existentes.
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ resumen devuelve todos los valores de la compra
//   ✔ (las 17 pruebas anteriores siguen en verde)
//   tests 18 | pass 18 | fail 0
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
  // Agrega un producto con validaciones y acumulación.
  // (Iteraciones 2, 3 y 4)
  // ----------------------------------------------------------
  agregar(nombre, precio, cantidad = 1) {
    if (typeof precio !== 'number' || precio <= 0) {
      throw new Error('El precio debe ser mayor que cero');
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad debe ser un entero positivo');
    }

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
  // (Iteración 6)
  // ----------------------------------------------------------
  descuento() {
    if (!this.cupon) return 0;
    return Math.round(this.subtotal() * CUPONES[this.cupon]);
  }

  // ----------------------------------------------------------
  // MÉTODO: baseGravable()
  // Devuelve subtotal - descuento.
  // (Refactor Iteración 7)
  // ----------------------------------------------------------
  baseGravable() {
    return this.subtotal() - this.descuento();
  }

  // ----------------------------------------------------------
  // MÉTODO: iva()
  // Devuelve el IVA (19 %) sobre la base gravable.
  // (Iteración 7)
  // ----------------------------------------------------------
  iva() {
    return Math.round(this.baseGravable() * IVA);
  }

  // ----------------------------------------------------------
  // MÉTODO: total()
  // Devuelve el total a pagar: base gravable + IVA.
  // (Iteración 7)
  // ----------------------------------------------------------
  total() {
    return this.baseGravable() + this.iva();
  }

  // ----------------------------------------------------------
  // MÉTODO: resumen()
  // NUEVO (Reto A): devuelve un objeto con los 4 valores
  // de la compra: subtotal, descuento, iva y total.
  // Reutiliza los métodos ya existentes.
  // ----------------------------------------------------------
  resumen() {
    return {
      subtotal: this.subtotal(),
      descuento: this.descuento(),
      iva: this.iva(),
      total: this.total(),
    };
  }
}