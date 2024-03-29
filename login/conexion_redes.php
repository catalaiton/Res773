<?php
    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "redes";
    
    $mysqli = new mysqli($host, $user, $pass, $dbname);
    
    if ($mysqli->connect_errno) {
        die("Conexión Fallida: " . $mysqli->connect_error);
    } else {
        echo "Conectado xd";
    }
?>