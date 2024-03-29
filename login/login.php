<?php
include ('conexion_redes.php');

function iniciarSesion($email, $password) {
    $conn = conectar();
    
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);
    
    // consulta sql
    $sql = "SELECT * FROM usuario WHERE email='$email' AND psw='$password'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) == 1) {
       $_SESSION['email'] = $email;
       $_SESSION['psw']= $password;
       
       echo "
       <script type='text/javascript'>
        Swal.fire({
        icon : 'success',
       title : 'BIENVENIDO',
        text :  ' $_SESSION[email] al Sistema'
       }).then((result) => {
            if(result.isConfirmed){
            window.location='./Inicio.html';
           }
       }); </script>";
    } else {
        
        echo "Inicio de sesión fallido. Verifica tu email y contraseña.";
    }
    mysqli_close($conn);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["psw"];
    iniciarSesion($email, $password);
} else {
    header("Location: login/index.html");
    exit();
}
?>
