<?php
// Incluimos el archivo que contiene la función para conectar a la base de datos
include 'conexion_redes.php';


// Función para validar el inicio de sesión
function iniciarSesion($email, $password) {
    // Conectamos a la base de datos
    $conn = conectar();

    // Escapamos los datos para evitar inyección SQL
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Consulta SQL para buscar el usuario en la base de datos
    $sql = "SELECT * FROM usuario WHERE email='$email' AND psw='$password'";
    $result = mysqli_query($conn, $sql);

    // Verificamos si se encontró un usuario con el email y contraseña proporcionados
    if (mysqli_num_rows($result) == 1) {
        // Usuario válido, redireccionamos a la página de inicio
        header("Location: ../Inicio.html");
        exit();
    } else {
        // Usuario inválido, mostramos un mensaje de error
        echo "Inicio de sesión fallido. Verifica tu email y contraseña.";
    }

    // Cerramos la conexión a la base de datos
    mysqli_close($conn);
}

// Verificamos si se ha enviado el formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtenemos los datos del formulario
    $email = $_POST["email"];
    $password = $_POST["psw"];

    // Llamamos a la función para iniciar sesión
    iniciarSesion($email, $password);
} else {
    // Si se intenta acceder directamente a este script sin enviar el formulario, redireccionamos al formulario de inicio de sesión
    header("Location: login.html");
    exit();
}
?>