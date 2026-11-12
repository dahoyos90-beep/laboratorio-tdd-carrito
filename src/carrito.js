// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Iteración 1 — VERDE (código mínimo para pasar).
// ============================================================

// Laboratorio TDD: carrito de compras
// Escribe aquí el código SOLO después de tener una prueba en rojo.

// ============================================================
// CLASE: Carrito
// Representa el carrito de compras del cliente.
//
// ITERACIÓN 1: CARRITO VACÍO  [ESTADO: VERDE]
// Requisito: un carrito recién creado no tiene ítems
// y su subtotal es 0.
//
// TÉCNICA: "Fake it till you make it" (fíngelo hasta lograrlo).
// Devolvemos valores fijos (0) porque es el código mínimo
// que hace pasar las pruebas. La lógica real se implementará
// en la Iteración 2 (triangulación).
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   ✔ un carrito nuevo no tiene ítems
//   ✔ un carrito nuevo tiene subtotal 0
//   tests 2 | pass 2 | fail 0
// ============================================================
export class Carrito {
  // ----------------------------------------------------------
  // MÉTODO: cantidadDeItems()
  // Devuelve el número total de unidades en el carrito.
  // Iteración 1: valor fijo 0 (carrito vacío).
  // ----------------------------------------------------------
  cantidadDeItems() {
    return 0;
  }

  // ----------------------------------------------------------
  // MÉTODO: subtotal()
  // Devuelve la suma de precio × cantidad de los productos.
  // Iteración 1: valor fijo 0 (carrito vacío).
  // ----------------------------------------------------------
  subtotal() {
    return 0;
  }
}