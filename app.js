// ============================================================
// ARCHIVO: app.js
// PROPÓSITO: Controlador de la interfaz gráfica del carrito.
// ESTADO: Completo, etiquetado, conectado a src/carrito.js.
// ============================================================

// Importamos la clase Carrito. Con Vite en la raíz, la ruta es directa.
import { Carrito } from './src/carrito.js';

// ============================================================
// 1. ESTADO GLOBAL
// ============================================================
const carrito = new Carrito();

// ============================================================
// 2. REFERENCIAS AL DOM
// ============================================================
const formAgregar = document.getElementById('form-agregar');
const inputNombre = document.getElementById('input-nombre');
const inputPrecio = document.getElementById('input-precio');
const inputCantidad = document.getElementById('input-cantidad');
const mensajeError = document.getElementById('mensaje-error');

const tablaCarrito = document.getElementById('tabla-carrito');
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const carritoVacio = document.getElementById('carrito-vacio');

const inputCupon = document.getElementById('input-cupon');
const btnAplicarCupon = document.getElementById('btn-aplicar-cupon');
const btnQuitarCupon = document.getElementById('btn-quitar-cupon');
const mensajeCupon = document.getElementById('mensaje-cupon');

const totalSubtotal = document.getElementById('total-subtotal');
const totalDescuento = document.getElementById('total-descuento');
const totalIva = document.getElementById('total-iva');
const totalEnvio = document.getElementById('total-envio');
const totalFinal = document.getElementById('total-final');

const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

// ============================================================
// 3. FUNCIONES AUXILIARES
// ============================================================
function formatearPrecio(valor) {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
}

function mostrarMensaje(elemento, texto) {
  elemento.textContent = texto;
}

function limpiarFormulario() {
  inputNombre.value = '';
  inputPrecio.value = '';
  inputCantidad.value = '1';
  inputNombre.focus();
}

// ============================================================
// 4. RENDERIZADO
// ============================================================
function renderizarTabla() {
  const productos = carrito.productos;
  cuerpoTabla.innerHTML = '';

  if (productos.length === 0) {
    tablaCarrito.style.display = 'none';
    carritoVacio.style.display = 'block';
    btnVaciarCarrito.style.display = 'none';
    return;
  }

  tablaCarrito.style.display = 'table';
  carritoVacio.style.display = 'none';
  btnVaciarCarrito.style.display = 'block';

  productos.forEach((producto) => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = producto.nombre;
    fila.appendChild(celdaNombre);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = formatearPrecio(producto.precio);
    celdaPrecio.className = 'col-precio';
    fila.appendChild(celdaPrecio);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.textContent = producto.cantidad;
    fila.appendChild(celdaCantidad);

    const celdaSubtotal = document.createElement('td');
    celdaSubtotal.textContent = formatearPrecio(producto.precio * producto.cantidad);
    celdaSubtotal.className = 'col-subtotal';
    fila.appendChild(celdaSubtotal);

    const celdaAccion = document.createElement('td');
    celdaAccion.className = 'col-accion';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.title = 'Eliminar producto';
    btnEliminar.addEventListener('click', () => {
      try {
        carrito.eliminar(producto.nombre);
        renderizarTodo();
      } catch (error) {
        alert(error.message);
      }
    });

    celdaAccion.appendChild(btnEliminar);
    fila.appendChild(celdaAccion);

    cuerpoTabla.appendChild(fila);
  });
}

function renderizarTotales() {
  totalSubtotal.textContent = formatearPrecio(carrito.subtotal());
  totalDescuento.textContent = `-${formatearPrecio(carrito.descuento())}`;
  totalIva.textContent = formatearPrecio(carrito.iva());
  totalEnvio.textContent = formatearPrecio(carrito.envio());
  totalFinal.textContent = formatearPrecio(carrito.total());
}

function renderizarTodo() {
  renderizarTabla();
  renderizarTotales();
}

// ============================================================
// 5. EVENTOS
// ============================================================
formAgregar.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mostrarMensaje(mensajeError, '');

  const nombre = inputNombre.value.trim();
  const precio = Number(inputPrecio.value);
  const cantidad = Number(inputCantidad.value);

  try {
    carrito.agregar(nombre, precio, cantidad);
    renderizarTodo();
    limpiarFormulario();
  } catch (error) {
    mostrarMensaje(mensajeError, error.message);
  }
});

btnAplicarCupon.addEventListener('click', () => {
  mostrarMensaje(mensajeCupon, '');
  const codigo = inputCupon.value.trim();

  if (!codigo) {
    mostrarMensaje(mensajeCupon, 'Ingresa un código de cupón.');
    return;
  }

  try {
    carrito.aplicarCupon(codigo);
    renderizarTodo();
    btnQuitarCupon.style.display = 'inline-block';
    inputCupon.value = '';
  } catch (error) {
    mostrarMensaje(mensajeCupon, error.message);
  }
});

btnQuitarCupon.addEventListener('click', () => {
  carrito.cupon = null;
  mostrarMensaje(mensajeCupon, '');
  btnQuitarCupon.style.display = 'none';
  renderizarTodo();
});

btnVaciarCarrito.addEventListener('click', () => {
  if (confirm('¿Seguro que quieres vaciar el carrito?')) {
    carrito.productos = [];
    carrito.cupon = null;
    btnQuitarCupon.style.display = 'none';
    renderizarTodo();
  }
});

// ============================================================
// 6. INICIALIZACIÓN
// ============================================================
function init() {
  renderizarTodo();
  inputNombre.focus();
}

init();