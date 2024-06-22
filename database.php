<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = $_GET["action"];

switch ($action){
    case 'get_makes':
        $query = "SELECT DISTINCT Make FROM vehicle_parts";
        $result = $conn->query($query);

        $makes = array();
        while($row = $result->fetch_assoc()) {
            $makes[] = $row['Make'];
        }

        echo json_encode($makes);
        break;

    default:
        echo json_encode(array("Error" => "Invalid action"));
}



$conn->close();
?>