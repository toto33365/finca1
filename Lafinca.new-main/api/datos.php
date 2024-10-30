<?php
// Requerimos el archivo modelos.php donde se encuentra la Clase Modelo
require_once 'modelos.php';

$mensaje = '';

if(isset($_GET['tabla'])) { // Si está seteado $_GET['tabla']
    $tabla = new Modelo($_GET['tabla']); // Creamos el objeto $tabla

    if(isset($_GET['id'])) {   // Si está seteado el atributo id
        $tabla->set_criterio("id=".$_GET['id']); // Establecemos el criterio
    }

    if(isset($_GET['accion'])){ // Si está seteada GET['accion']
        if($_GET['accion'] == 'insertar' || $_GET['accion'] == 'actualizar'){ // Si la accion es insertar O es igual a actualizar
            $valores = $_POST; // Tomamos lo que viene del post            
        }    

        // Subida de imágenes
        if(                                     // si
            isset($_FILES) &&                      // está seteado $_FILES Y
            isset($_FILES['imagen']) &&            // está seteado $_FILES['imagen'] Y
            !empty($_FILES['imagen']['name'] &&    // NO está vacío $_FILES['imagen']['name'] Y
            !empty($_FILES['imagen']['tmp_name'])) // NO está vacío $_FILES['imagen']['tmp_name']
            ) {
            if(is_uploaded_file($_FILES['imagen']['tmp_name'])) {
                $tmp_nombre = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagen/' . $nombre;
                if(move_uploaded_file($tmp_nombre, $destino)) { // Si podemos mover el archivo temporal al destino
                    $mensaje .= 'Archivo subido correctamente a ' . $destino;
                    $valores['imagen'] = $nombre;
                } else {
                    $mensaje .= 'No se ha podido subir el archivo';
                    unlink(ini_get('upload_tmp_dir').$_FILES['imagen']['tmp_name']);
                }
            } else {
                $mensaje .= 'Error: El archivo no fue procesado correctamente';
            }
        }

        switch($_GET['accion']){    // Según la acción
            case 'seleccionar':         // En caso que sea seleccionar
                $datos= $tabla->seleccionar();  // Ejecutamos el método seleccionar()
                echo $datos ;                   // Mostramos los datos
                break;

            case 'insertar':            // En caso que sea insertar              
                $tabla->insertar($valores);     // Ejecutamos el método insertar()
                $mensaje .= 'Datos guardados';  // Creamos un mensaje
                echo json_encode($mensaje);     // Devolvemos el mensaje en formato JSON
                break;
            
            case 'actualizar':          // En caso que sea actualizar
                $tabla->actualizar($valores);     // Ejecutamos el método actualizar()
                $mensaje .= 'Datos actualizados'; // Creamos un mensaje
                echo json_encode($mensaje);       // Devolvemos el mensaje en formato JSON
                break;

            case 'eliminar':            // En caso que sea eliminar
                $tabla->eliminar();             // Ejecutamos el método eliminar()
                $mensaje .= 'Dato eliminado';   // Creamos un mensaje
                echo json_encode($mensaje);     // Devolvemos el mensaje en formato JSON
                break;
        }
    }
}
