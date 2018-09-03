<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once "config.php";
$output = array();
$request_body = file_get_contents('php://input');
$request = json_decode($request_body);

if (isset($request->id)) {
    $id = filter_var($request->id, FILTER_VALIDATE_INT);
    $Type = filter_var($request->type, FILTER_VALIDATE_INT);
    if (!empty($id)) {
        // if type  == 2  change statu todo to completed
        if ($Type == 2) {
            $completDate = date("Y-m-d H:i:s");
            $updated = mysqli_query($con, "UPDATE  todo SET todoStatu=2,completDate='$completDate' WHERE id=$id ");
            if (isset($updated)) {
                $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=1 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["todos"][] = $data;
                }
                $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=2 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["completed"][] = $data;
                }
            } else {
                $output['msg'] = "error cannot execute query ";

            }
        } else { // if  type = 1  then change statu todo to uncompleted
            $updated = mysqli_query($con, "UPDATE  todo SET todoStatu=1 WHERE id=$id ");
            if (isset($updated)) {
                $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=1 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["todos"][] = $data;
                }
                $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=2 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["completed"][] = $data;
                }
            } else {
                $output['msg'] = "error cannot execute query ";

            }
        }

    }

}

echo json_encode($output, JSON_PRETTY_PRINT);

mysqli_close($con);
