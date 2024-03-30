<?php
// Incluimos el archivo que contiene la función para conectar a la base de datos
include 'conexion_redes.php';

// Función para registrar un nuevo usuario
function registrarUsuario($email, $password) {
    // Conectamos a la base de datos
    $conn = conectar();

    // Escapamos los datos para evitar inyección SQL
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Consulta SQL para insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuario (email, psw) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registro exitoso!";
    } else {
        echo "Error al registrar usuario: " . $conn->error;
    }

    // Cerramos la conexión a la base de datos
    mysqli_close($conn);
}

// Verificamos si se ha enviado el formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtenemos los datos del formulario
    $email = $_POST["email"];
    $password = $_POST["psw"];

    // Llamamos a la función para registrar el usuario
    registrarUsuario($email, $password);
} else {
    // Si se intenta acceder directamente a este script sin enviar el formulario, redireccionamos al formulario de registro
    header("Location: registro.html");
    exit();
}
?>
