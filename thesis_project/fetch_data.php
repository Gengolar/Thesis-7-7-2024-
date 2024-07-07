<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "thesis_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT datetime, sensor_address, capacity_level FROM sensor_data";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>
