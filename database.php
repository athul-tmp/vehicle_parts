<?php
// MySQL server credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testdb";

// Establish connection with MySQL using credentials
$conn = new mysqli($servername, $username, $password, $dbname);

// Quit and display error message if connection fails
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get 'action' parameter from URL query string
$action = $_GET["action"];

// Perform different actions based on the value of 'action'
switch ($action){

    // Retrieve all distinct makes from the databasee
    case 'get_makes':
        $query = "SELECT DISTINCT Make FROM vehicle_parts;";
        $result = $conn->query($query);

        $makes = array();
        while($row = $result->fetch_assoc()) {
            $makes[] = $row['Make'];
        }

        echo json_encode($makes);
        break;

    // Retrieve all distinct models based on the selected make
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

    // Retrieve all distinct types based on the selected make and model
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

    // Retrieve all distinct part numbers based on the selected make, model, and type
    case 'get_partNo':
        $make = $_GET["make"];
        $model = $_GET["model"];
        $type = $_GET["type"];
        $query = "SELECT DISTINCT PartNo FROM vehicle_parts WHERE Make='$make' AND Model='$model' AND Type='$type';";
        $result = $conn->query($query);

        $partNo = array();
        while($row = $result->fetch_assoc()) {
            $partNo[] = $row['PartNo'];
        }

        echo json_encode($partNo);
        break;

    // Display an error message if an invalid action is requested
    default:
        echo json_encode(array("Error" => "Invalid action"));
        break;
}

// Close database connection
$conn->close();
?>