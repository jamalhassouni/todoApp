<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once "config.php";
$output = array();
if (isset($_GET['id'])) {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    if (!empty($id)) {
        $completDate = date("Y-m-d H:i:s");
    $updated = mysqli_query($con, "UPDATE  todo SET todoStatu=2,completDate='$completDate' WHERE id=$id ");
    if (isset($updated)) {
     $query = mysqli_query($con, "SELECT  * from todo WHERE todoStatu=2 ");
      while ($data = mysqli_fetch_object($query)) {
             $output[] = $data;
         }
        } else {
          $output['msg'] = "error cannot execute query ";

        }

    }

} else {

    $query = mysqli_query($con, "SELECT  * from todo WHERE todoStatu=2");
    while ($data = mysqli_fetch_object($query)) {
        $output[] = $data;
    }
}

echo json_encode($output, JSON_PRETTY_PRINT);

mysqli_close($con);
