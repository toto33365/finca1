// Importa las funciones y variables de usuarios en lugar de propiedades
import { insertarUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } from "../modelos/usuarios";

const btnAgregar = document.querySelector('#btnAgregar');
const formularioModal = new bootstrap.Modal(document.getElementById('addUserModal'));
const formulario = document.querySelector('#formulario');
const btnGuardar = document.querySelector('#btnGuardar');
const contenedorUsuarios = document.querySelector('#lista-usuario tbody')
// Alerta
const alerta = document.querySelector('#alerta');

// Imputs
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombreYApellido");
const inputCorreo = document.querySelector("#correo");
const inputDni = document.querySelector("#dni");
const inputFechaDeNacimiento = document.querySelector("#fechaDeNacimiento");
const inputSexo = document.querySelector("#sexo");
const inputDireccion = document.querySelector("#direccion");
const inputLocalidad = document.querySelector("#localidad");
const inputProvincia = document.querySelector("#provincia");
const inputPassword = document.querySelector("#password");
const inputObservaciones = document.querySelector("#observaciones");
const inputTelefono = document.querySelector("#telefono");

// Variables
let opcion = '';
let id;
let codigo;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
});

/**
* Ejecuta el evento click del Botón Nuevo
*/
btnAgregar.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputCorreo.value = null;
    inputDni.value = null;
    inputFechaDeNacimiento.value = null;
    inputSexo.value = null;
    inputDireccion.value = null;
    inputLocalidad.value = null;
    inputProvincia.value = null;
    inputPassword.value = null;
    inputObservaciones.value = null;
    inputTelefono.value = null;


    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
});

let usuarios = [];

// Función para mostrar usuarios
async function mostrarUsuarios() {
    usuarios = await obtenerUsuarios();
    const tablaUsuarios = document.querySelector('table tbody');
    tablaUsuarios.innerHTML = '';
     for(let usuario of usuarios) {
        const fila = document.createElement('tr');
        
        fila.innerHTML += `
        <td ><span name="spancodigo">${usuario.codigo}</span></td>
        <td><span name="spannombreyapellido">${usuario.nombreyapellido}</span></td>
        <td><span name="spancorreo">${usuario.correo}</span></td>
        <td style="display: none;"><span name="spandni">${usuario.dni}</span></td>
        <td style="display: none;"><span name="spanfechadenac">${usuario.fechadenacimiento}</span></td>
        <td style="display: none;"><select name="spansexo" class="form-control sexoSelect"
        placeholder="sexo">
        <option value="femenino" ${usuario.sexo === 'Femenino' ? 'selected' : ''}>Femenino</option>
        <option value="massculino" ${usuario.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
        <option value="no-binario" ${usuario.sexo === 'No binario' ? 'selected' : ''}>No binario</option>
        </select></td>
        <td style="display: none;"><span name="spandirección">${usuario.direccion}</span></td>
        <td style="display: none;"><span name="spanlocalidad">${usuario.localidad}</span></td>
        <td style="display: none;"><span name="spanprovincia">${usuario.provincia}</span></td>
        <td style="display: none;"><span name="spanpassword">${usuario.password}</span></td>
        <td style="display: none;"><span name="spanobservaciones">${usuario.observaciones}</span></td>
        <td style="display: none;"><span name="spantelefono">${usuario.telefono}</span></td>
        <td>
        <a class="btnEditar btn btn-primary btn-sm">Editar</a>
        <a class="btnBorrar btn btn-danger btn-sm">Borrar</a>
        <input type="hidden" class="idUsuario" value="${usuario.id}">
        </td>
        
      `;
      tablaUsuarios.appendChild(fila);


    }
}

// Evento submit del formulario
btnGuardar.addEventListener('click', function (e) {
    debugger;
    e.preventDefault();
    const datos = new FormData(formulario);
    debugger;
    switch (opcion) {
        case 'insertar':
            debugger;
            mensajeAlerta = `Datos guardados`;
            insertarUsuarios(datos);
            break;

        case 'actualizar':
            debugger;
            mensajeAlerta = `Datos actualizados`;
            actualizarUsuarios(datos, id);
            break;
    }

    insertarAlerta(mensajeAlerta, 'success');
    mostrarUsuarios();

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
    id = e.target.parentNode.querySelector('.idUsuario').value;

    let usuario = usuarios.find(x => x.id === id); 

    inputCodigo.value = usuario.codigo;
    inputNombre.value = usuario.nombreyapellido;
    inputCorreo.value = usuario.correo;
    inputDni.value = usuario.dni;
    inputFechaDeNacimiento.value = usuario.fechadenacimiento;
    switch (usuario.sexo) {
        case "Femenino":
            inputSexo.value = "femenino";
            break;
        case "Masculino":
            inputSexo.value = "massculino";
            break;
        default:
            inputSexo.value = "no-binario";
            break;
    }
    inputSexo.value = usuario.sexo;
    inputDireccion.value = usuario.direccion;
    inputLocalidad.value = usuario.localidad;
    inputProvincia.value = usuario.provincia;
    inputPassword.value = usuario.password;
    inputObservaciones.value = usuario.observaciones;
    inputTelefono.value = usuario.telefono;


    // Mostrar formulario
    formularioModal.show();
    opcion = 'actualizar';
});

// Evento para el botón Borrar, adaptado para usuarios
on(document, 'click', '.btnBorrar', e => {
    const botones = e.target.parentNode;
    id = botones.querySelector('.idUsuario').value;
    const nombre = botones.parentNode.querySelector('span[name=spannombreyapellido]').innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`);

    if (aceptar) {
        eliminarUsuarios(id);
        insertarAlerta(`${nombre} eliminado`, 'danger');
        mostrarUsuarios();
    }
});