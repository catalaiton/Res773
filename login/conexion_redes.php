<?php
function conectar() {
    $host = "localhost";
    $user = "root";
    $pass = ""; // Recuerda cambiar esto si tienes una contraseña configurada
    $dbname = "redes";

    // Intenta establecer la conexión a la base de datos
    $mysqli = new mysqli($host, $user, $pass, $dbname);

    // Verifica si hay errores de conexión
    if ($mysqli->connect_errno) {
        // Si hay un error, lanza una excepción con el mensaje de error
        throw new Exception("Error al conectar a la base de datos: " . $mysqli->connect_error);
    }

    // Devuelve el objeto de conexión si la conexión es exitosa
    return $mysqli;
}
?>
