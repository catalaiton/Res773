<?php
function conectar() {
    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "redes";
    
    $mysqli = new mysqli($host, $user, $pass, $dbname);
    
    if ($mysqli->connect_errno) {
        throw new Exception("Error al conectar a la base de datos: " . $mysqli->connect_error);
    }
    
    return $mysqli;
}
?>