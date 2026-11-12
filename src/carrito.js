// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Reto D — VERDE (cupones flexibles).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CONSTANTE: IVA
// ============================================================
const IVA = 0.19;

// ============================================================
// CONSTANTE: CUPONES
// ============================================================
const CUPONES = {
  DESC10: 0.10,
  DESC20: 0.20,
};

// ============================================================
// CONSTANTE: ENVIO
// ============================================================
const ENVIO = 12000;

// ============================================================
// CONSTANTE: ENVIO_GRATIS_DESDE
// ============================================================
const ENVIO_GRATIS_DESDE = 150000;

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
// RETO A: RESUMEN DE LA COMPRA  [ESTADO: VERDE]
// RETO B: COSTO DE ENVÍO  [ESTADO: VERDE]
// RETO C: ACTUALIZAR CANTIDAD  [ESTADO: VERDE]
//
// RETO D: CUPONES FLEXIBLES  [ESTADO: VERDE]
// Requisito: 'desc10' (minúsculas) y ' DESC10 ' (con espacios)
// deben funcionar igual que 'DESC10'.
//
// TÉCNICA: En aplicarCupon(), se normaliza el código con
// .trim().toUpperCase() antes de buscar en CUPONES. Así
// cualquier combinación de mayúsculas/minúsculas y espacios
// se convierte al formato canónico (DESC10, DESC20).
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ acepta el cupón en minúsculas
//   ✔ acepta el cupón con espacios alrededor
//   ✔ (las 26 pruebas anteriores siguen en verde)
//   tests 28 | pass 28 | fail 0
// ============================================================
export class Carrito {
  // ----------------------------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------------------------
  constructor() {
    this.productos = [];
    this.cupon = null;
  }

  // ----------------------------------------------------------
  // MÉTODO: agregar(nombre, precio, cantidad)
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
  // MÉTODO: actualizarCantidad(nombre, nueva)
  // (Reto C)
  // ----------------------------------------------------------
  actualizarCantidad(nombre, nueva) {
    if (!Number.isInteger(nueva) || nueva < 0) {
      throw new Error('La cantidad debe ser un entero mayor o igual a cero');
    }

    const indice = this.productos.findIndex((p) => p.nombre === nombre);

    if (indice === -1) {
      throw new Error(`El producto "${nombre}" no está en el carrito`);
    }

    if (nueva === 0) {
      this.productos.splice(indice, 1);
      return;
    }

    this.productos[indice].cantidad = nueva;
  }

  // ----------------------------------------------------------
  // MÉTODO: cantidadDeItems()
  // (Iteración 2)
  // ----------------------------------------------------------
  cantidadDeItems() {
    return this.productos.reduce((suma, p) => suma + p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: subtotal()
  // (Iteración 2)
  // ----------------------------------------------------------
  subtotal() {
    return this.productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: aplicarCupon(codigo)
  // (Iteración 6 + Reto D)
  // Normaliza el código con trim().toUpperCase() antes de
  // buscar en CUPONES. Así 'desc10' y ' DESC10 ' funcionan.
  // ----------------------------------------------------------
  aplicarCupon(codigo) {
    const normalizado = String(codigo).trim().toUpperCase();

    if (!(normalizado in CUPONES)) {
      throw new Error(`El cupón "${codigo}" no es válido`);
    }

    this.cupon = normalizado;
  }

  // ----------------------------------------------------------
  // MÉTODO: descuento()
  // (Iteración 6)
  // ----------------------------------------------------------
  descuento() {
    if (!this.cupon) return 0;
    return Math.round(this.subtotal() * CUPONES[this.cupon]);
  }

  // ----------------------------------------------------------
  // MÉTODO: baseGravable()
  // (Refactor Iteración 7)
  // ----------------------------------------------------------
  baseGravable() {
    return this.subtotal() - this.descuento();
  }

  // ----------------------------------------------------------
  // MÉTODO: iva()
  // (Iteración 7)
  // ----------------------------------------------------------
  iva() {
    return Math.round(this.baseGravable() * IVA);
  }

  // ----------------------------------------------------------
  // MÉTODO: envio()
  // (Reto B)
  // ----------------------------------------------------------
  envio() {
    return this.baseGravable() >= ENVIO_GRATIS_DESDE ? 0 : ENVIO;
  }

  // ----------------------------------------------------------
  // MÉTODO: total()
  // (Iteración 7 + Reto B)
  // ----------------------------------------------------------
  total() {
    return this.baseGravable() + this.iva() + this.envio();
  }

  // ----------------------------------------------------------
  // MÉTODO: resumen()
  // (Reto A)
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