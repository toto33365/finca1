// Importa las funciones y variables de usuarios en lugar de propiedades
import { insertarIngresos, obtenerIngresos, actualizarIngresos, eliminarIngresos } from "../modelos/ingresos";

const btnAgregar = document.querySelector('#btnAgregar');
const formulario = document.querySelector('#agregar-ingreso');
const formularioModal = new bootstrap.Modal(document.getElementById('addUserModal'));
const btnGuardar = document.querySelector('#btnGuardar');
const contenedorIngresos = document.querySelector('#lista-ingresos tbody')

// Alerta
const alerta = document.querySelector('#alerta');

// Inputa
const inputDescripcion = document.querySelector('#descripcion');
const inputImporte = document.querySelector('#importe');
const inputFecha = document.querySelector('#fecha');
const inputFormaDePago = document.querySelector('#formaDePago');

// Variables
let opcion = '';
let id;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
    mostrarIngresos();
});

/**
* Ejecuta el evento click del Botón Agregar Ingreso
*/
btnAgregar.addEventListener('click', () => {
    // Limpiamos los inputs
    inputDescripcion.value = null;
    inputImporte.value = null;
    inputFecha.value = null;
    inputFormaDePago.value = null;

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
})

let ingresos = [];

// Función para mostrar usuarios
async function mostrarIngresos() {
    ingresos = await obtenerIngresos();
    const tablaIngresos = document.querySelector('table tbody');
    tablaIngresos.innerHTML = '';
    for (let ingreso of ingresos) {
        console.log(ingreso);
        const fila = document.createElement('tr');
        fila.innerHTML += `
        <td ><span name="spandescripcion">${ingreso.descripcion}</span></td>
        <td><span name="spanimporte">${ingreso.importe}</span></td>
        <td><span name="spanfecha">${ingreso.fecha}</span></td>
            <select disabled name="spanformadepago" class="form-control formaDePagoSelect">
                <option value="efectivo" ${ingreso.formadepago === 'Efectivo' ? 'selected' : ''}>Efectivo</option>
                <option value="tarjeta-de-credito" ${ingreso.formadepago === 'Tarjeta de credito' ? 'selected' : ''}>Tarjeta de Crédito</option>
                <option value="tarjeta-de-debito" ${ingreso.formadepago === 'Tarjeta de debito' ? 'selected' : ''}>Tarjeta de Débito</option>
            </select>
        </td>
        <td>
            <a class="btnEditar btn btn-primary btn-sm">Editar</a>
            <a class="btnBorrar btn btn-danger btn-sm">Borrar</a>
            <input type="hidden" class="idIngreso" value="${ingreso.id}">
        </td>
        
        `;
        tablaIngresos.appendChild(fila);


    }
}

// Evento submit del formulario
btnGuardar.addEventListener('click', function (e) {
    e.preventDefault();
    const datos = new FormData(formulario);
    switch (opcion) {
        case 'insertar':
            mensajeAlerta = `Datos guardados`;
            insertarIngresos(datos);
            break;

        case 'actualizar':
            mensajeAlerta = `Datos actualizados`;
            actualizarIngresos(datos, id);
            break;
    }

    insertarAlerta(mensajeAlerta, 'success');
    mostrarIngresos(); 

      // Referenciar al modal y cerrarlo
      formularioModal.hide();
});

/**
* Define el mensaje de alerta
* @param mensaje el mensaje a mostrar
* @param tipo el tipo de alerta
*/
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
        <div>${mensaje}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
    `;
    alerta.append(envoltorio);

    setTimeout(() => {
        envoltorio.remove();
    }, 3000);

};

/**
* Determina en qué elemento se realiza un evento
* @param elemento el elemento al que se realiza el evento
* @param evento el evento realizado
* @param selector el selector seleccionado
* @param manejador el método que maneja el evento
*/
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => { // Agregamos el método para escuchar el evento
        if (e.target.closest(selector)) { // Si el objetivo del manejador es el selector
            manejador(e); // Ejecutamos el método del manejador
        }
    })
}

// Evento para el botón Editar, adaptado para usuarios
on(document, 'click', '.btnEditar', e => {
    debugger;
    const acciones = e.target.parentNode.parentNode;

    id = acciones.querySelector('.idIngreso').value;
    const descripcion = acciones.parentNode.querySelector('span[name=spandescripcion]').innerHTML;
    const importe = acciones.parentNode.querySelector('span[name=spanimporte]').innerHTML;
    const fecha = acciones.parentNode.querySelector('span[name=spanfecha]').innerHTML;
    const formaDePago = acciones.parentNode.querySelector('.formaDePagoSelect').value;


    inputDescripcion.value = descripcion;
    inputImporte.value = importe;
    inputFecha.value = fecha;
   
    switch (formaDePago) {
        case "Efectivo":
            inputFormaDePago.value = "efectivo";
            break;
        case "Tarjeta de Crédito":
            inputFormaDePago.value = "tarjeta-de-credito";
            break;
        default:
            inputFormaDePago.value = "tarjeta-de-Débito";
            break;
    }
    inputFormaDePago.value = formaDePago;
    // Mostrar formulario
    formularioModal.show();
    opcion = 'actualizar';
})

// Evento para el botón Borrar, adaptado para usuarios
on(document, 'click', '.btnBorrar', e => {
    const acciones = e.target.parentNode;
    id = acciones.querySelector('.idIngreso').value;
    const descripcion = acciones.parentNode.querySelector('span[name=spandescripcion]').innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a ${descripcion}?`);

    if (aceptar) {
        eliminarIngresos(id);
        insertarAlerta(`${descripcion} eliminado`, 'danger');
        mostrarIngresos();
    }
});