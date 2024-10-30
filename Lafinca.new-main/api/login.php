<?php
 require_once 'modelos.php';
 $valores = $_POST;

 $usuario = "'".$valores['usuario']."'";
 $password = "'".$valores['password']."'";

 $usuarios = new Modelo('usuarios');
 $usuarios->set_criterio("usuario=$usuario AND password=$password");
 $datos = $usuarios->seleccionar();
 echo $datos;

 // SELECT * FROM clientes WHERE usuario='josesanmartin' AND password='123456'

 ?>