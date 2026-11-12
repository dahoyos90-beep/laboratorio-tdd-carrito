// ============================================================
// ARCHIVO: src/carrito.js
// PROPÓSITO: Código de producción del carrito de compras (TDD).
// ESTADO ACTUAL: Interfaz completada (corrección de envío vacío).
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
// Diccionario de cupones válidos. Cada cupón tiene:
//   - tipo: 'porcentaje' | 'fijo'
//   - valor: el porcentaje (0.10, 0.20) o el monto fijo (30000)
//
// El cambio de estructura (objeto con tipo y valor) permite
// soportar cupones de porcentaje y de valor fijo en el mismo
// diccionario, sin lógica condicional dispersa.
// ============================================================
const CUPONES = {
  DESC10: { tipo: 'porcentaje', valor: 0.10 },
  DESC20: { tipo: 'porcentaje', valor: 0.20 },
  MENO530K: { tipo: 'fijo', valor: 30000 },
};

// ============================================================
// CONSTANTE: ENVIO
// Costo del envío en pesos colombianos.
// ============================================================
const ENVIO = 12000;

// ============================================================
// CONSTANTE: ENVIO_GRATIS_DESDE
// Base gravable a partir de la cual el envío es gratis.
// ============================================================
const ENVIO_GRATIS_DESDE = 150000;

// ============================================================
// CLASE: Carrito
// Representa el carrito de compras del cliente.
//
// ITERACIONES Y RETOS COMPLETADOS:
//   ITERACIÓN 1: CARRITO VACÍO
//   ITERACIÓN 2: AGREGAR PRODUCTOS
//   ITERACIÓN 3: PRODUCTO REPETIDO
//   ITERACIÓN 4: VALIDACIONES
//   ITERACIÓN 5: ELIMINAR PRODUCTOS
//   ITERACIÓN 6: CUPONES DE DESCUENTO
//   ITERACIÓN 7: IVA Y TOTAL A PAGAR
//   RETO A: RESUMEN DE LA COMPRA
//   RETO B: COSTO DE ENVÍO (Modificado: envío 0 si carrito vacío)
//   RETO C: ACTUALIZAR CANTIDAD
//   RETO D: CUPONES FLEXIBLES
//   RETO E: CUPÓN DE VALOR FIJO
//
// RESULTADO ESPERADO AL EJECUTAR npm test:
//   tests 31 | pass 31 | fail 0
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
  // Agrega un producto al carrito. Si no se indica cantidad,
  // se asume 1.
  //
  // Iteración 4: antes de insertar o acumular, valida:
  //   - precio debe ser número y mayor que 0.
  //   - cantidad debe ser entero y mayor que 0.
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
  // MÉTODO: eliminar(nombre)
  // Quita un producto del carrito por su nombre.
  // Si el producto no existe, lanza un Error cuyo mensaje
  // contiene 'no está en el carrito'.
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
  // Actualiza la cantidad de un producto.
  //   - nueva < 0 → error con /cantidad/.
  //   - producto inexistente → error con /no está en el carrito/.
  //   - nueva === 0 → elimina el producto.
  //   - nueva > 0 → actualiza la cantidad.
  // (Reto C)
  // ----------------------------------------------------------
  actualizarCantidad(nombre, nueva) {
    // Validación de cantidad negativa o no entera.
    if (!Number.isInteger(nueva) || nueva < 0) {
      throw new Error('La cantidad debe ser un entero mayor o igual a cero');
    }

    // Buscar el producto por nombre.
    const indice = this.productos.findIndex((p) => p.nombre === nombre);

    if (indice === -1) {
      throw new Error(`El producto "${nombre}" no está en el carrito`);
    }

    // Si la nueva cantidad es 0, eliminar el producto.
    if (nueva === 0) {
      this.productos.splice(indice, 1);
      return;
    }

    // Si es positiva, actualizar la cantidad.
    this.productos[indice].cantidad = nueva;
  }

  // ----------------------------------------------------------
  // MÉTODO: cantidadDeItems()
  // Devuelve el número total de unidades en el carrito,
  // sumando la cantidad de cada producto con reduce.
  // (Iteración 2)
  // ----------------------------------------------------------
  cantidadDeItems() {
    return this.productos.reduce((suma, p) => suma + p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: subtotal()
  // Devuelve la suma de precio × cantidad de los productos
  // usando reduce.
  // (Iteración 2)
  // ----------------------------------------------------------
  subtotal() {
    return this.productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  }

  // ----------------------------------------------------------
  // MÉTODO: aplicarCupon(codigo)
  // Guarda el código de cupón si es válido.
  // Normaliza el código con trim().toUpperCase() antes de
  // buscar en CUPONES. Así 'desc10' y ' DESC10 ' funcionan.
  // (Iteración 6 + Reto D)
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
  // Devuelve el valor del descuento en pesos colombianos.
  // Si no hay cupón aplicado, devuelve 0.
  // Calcula según el tipo de cupón:
  //   - porcentaje: Math.round(subtotal * valor)
  //   - fijo:       Math.min(valor, subtotal) (no deja base negativa)
  // En ambos casos el descuento nunca supera el subtotal.
  // (Iteración 6 + Reto E)
  // ----------------------------------------------------------
  descuento() {
    if (!this.cupon) return 0;

    const { tipo, valor } = CUPONES[this.cupon];
    const subtotal = this.subtotal();

    if (tipo === 'porcentaje') {
      return Math.min(Math.round(subtotal * valor), subtotal);
    }

    // tipo === 'fijo'
    return Math.min(valor, subtotal);
  }

  // ----------------------------------------------------------
  // MÉTODO: baseGravable()
  // Devuelve subtotal - descuento.
  // Es la base sobre la que se calcula el IVA.
  // Se extrajo para eliminar la duplicación en iva() y total().
  // (Refactor Iteración 7)
  // ----------------------------------------------------------
  baseGravable() {
    return this.subtotal() - this.descuento();
  }

  // ----------------------------------------------------------
  // MÉTODO: iva()
  // Devuelve el IVA (19 %) calculado sobre la base gravable.
  // Redondeado a pesos colombianos.
  // (Iteración 7)
  // ----------------------------------------------------------
  iva() {
    return Math.round(this.baseGravable() * IVA);
  }

  // ----------------------------------------------------------
  // MÉTODO: envio()
  // (Reto B)
  // CORRECCIÓN DE INTERFAZ: Si el carrito está vacío (0 items),
  // no se cobra envío y se devuelve 0. Si tiene productos, se
  // aplica la regla de negocio: gratis desde 150.000.
  // ----------------------------------------------------------
  envio() {
    if (this.cantidadDeItems() === 0) return 0;
    return this.baseGravable() >= ENVIO_GRATIS_DESDE ? 0 : ENVIO;
  }

  // ----------------------------------------------------------
  // MÉTODO: total()
  // Devuelve el total a pagar: base gravable + IVA + envío.
  // El envío no paga IVA.
  // (Iteración 7 + Reto B)
  // ----------------------------------------------------------
  total() {
    return this.baseGravable() + this.iva() + this.envio();
  }

  // ----------------------------------------------------------
  // MÉTODO: resumen()
  // Devuelve un objeto con los 4 valores de la compra:
  // subtotal, descuento, iva y total.
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