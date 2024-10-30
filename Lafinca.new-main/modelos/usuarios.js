// URL para acceder a la API de usuarios
const url = './api/datos.php?tabla=usuarios';

/**
 * Función asíncrona para obtener los usuarios
 * @return datos los datos en formato JSON
 */
export async function obtenerUsuarios() {
  const res = await fetch(`${url}&accion=seleccionar`);
  const datos = await res.json();
  if (res.status !== 200) {
    throw Error('Los datos no existen');
  }
  return datos;
} 

/**
 * Inserta los datos en la base de datos
 * @param datos los datos a insertar
 */
export function insertarUsuarios(datos) {
  fetch(`${url}&accion=insertar`, {
    method: 'POST',
    body: datos
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      return data;
      
    });
    
}
  /**
   * Actualiza los datos en la base de datos
   * @param datos los datos a actualizar
   * @param id el id del usuario
   */
  export const actualizarUsuarios
    = (datos, id) => {
      fetch(`${url}&accion=actualizar&id=${id}`, {
        // Ejecutamos el método actualizar de la API
        method: 'POST',
        body: datos
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          return data;
          
        });
        
    }

  /**
   * Elimina los datos en la base de datos
   * @param id el id del usuario a eliminar
   */
  export const eliminarUsuarios = (id) => {
    fetch(`${url}&accion=eliminar&id=${id}`, {}) // Ejecutamos el método eliminar de la API
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data;
      })
}