<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once "config.php";
$output = array();
if (isset($_GET['todo'])) {
    $item = filter_var($_GET['todo'], FILTER_SANITIZE_STRING);
    if (!empty($item)) {
        $insert = mysqli_query($con, "INSERT INTO todo (item,todoStatu) VALUES ('$item',1)");
        if (isset($insert)) {
            $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=1");
            while ($data = mysqli_fetch_object($query)) {
                $output["todos"][] = $data;
            }
            $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=2");
            while ($data = mysqli_fetch_object($query)) {
                $output["completed"][] = $data;
            }
        } else {
            $output['msg'] = "error cannot execute query ";

        }

    }

} else {

    $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=1");
    while ($data = mysqli_fetch_object($query)) {
        $output["todos"][] = $data;
    }
    $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=2");
    while ($data = mysqli_fetch_object($query)) {
        $output["completed"][] = $data;
    }
}

echo json_encode($output, JSON_PRETTY_PRINT);

mysqli_close($con);
