<?php
$conn = mysqli_connect("127.0.0.1", "root", "", "pg_life");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Please contact the admin.";
    return;
}