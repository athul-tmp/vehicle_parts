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

    case 'get_models':
        $make = $_GET["make"];
        $query = "SELECT DISTINCT Model FROM vehicle_parts WHERE Make='$make';";
        $result = $conn->query($query);

        $models = array();
        while($row = $result->fetch_assoc()) {
            $models[] = $row['Model'];
        }

        echo json_encode($models);
        break;

    case 'get_types':
        $make = $_GET["make"];
        $model = $_GET["model"];
        $query = "SELECT DISTINCT Type FROM vehicle_parts WHERE Make='$make' AND Model='$model';";
        $result = $conn->query($query);

        $types = array();
        while($row = $result->fetch_assoc()) {
            $types[] = $row['Type'];
        }

        echo json_encode($types);
        break;

    case 'get_partNo':
        $make = $_GET["make"];
        $model = $_GET["model"];
        $type = $_GET["type"];
        $query = "SELECT DISTINCT PartNo FROM vehicle_parts WHERE Make='$make' AND Model='$model' AND Type='$type';";
        $result = $conn->query($query);

        $partNo = array();
        while($row = $result->fetch_assoc()) {
            $partNo[] = $partNo['PartNo'];
        }

        echo json_encode($partNo);
        break;

    default:
        echo json_encode(array("Error" => "Invalid action"));
}



$conn->close();
?>