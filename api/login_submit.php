<?php
session_start();
require("../includes/database_connect.php");

$email = $_POST['email'];
$password = $_POST['password'];
$password = sha1($password);

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo "Something went wrong!";
    exit;
}

$row_count = mysqli_num_rows($result);

if ($row_count == 0) {
    echo "Invalid Email or Password!";
    exit;
}

$user = mysqli_fetch_assoc($result);

$_SESSION['user_id'] = $user['id'];
$_SESSION['full_name'] = $user['full_name'];

mysqli_close($conn);

header("location: ../index.php");
?>