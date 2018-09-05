<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once "config.php";
$output = array();
$request_body = file_get_contents('php://input');
$request = json_decode($request_body);

if (isset($request->from) AND isset($request->posFrom) AND isset($request->to) AND isset($request->posTo)) {
    $from = filter_var($request->from, FILTER_VALIDATE_INT);
    $posFrom = filter_var($request->posFrom, FILTER_VALIDATE_INT);
    $to = filter_var($request->to, FILTER_VALIDATE_INT);
    $posTo = filter_var($request->posTo, FILTER_VALIDATE_INT);
    if (!empty($from) AND !empty($posFrom) AND !empty($to) AND !empty($posTo)) {
        $sql = "UPDATE todo SET sort = CASE id WHEN $from THEN  $posFrom
                  WHEN $to THEN $posTo  END  WHERE id in ($from, $to)";
      $update = mysqli_query($con,$sql);
      if (isset($update)) {
        $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=1 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["todos"][] = $data;
                }
                $query = mysqli_query($con, "SELECT * from todo WHERE todoStatu=2 ORDER BY sort ASC");
                while ($data = mysqli_fetch_object($query)) {
                    $output["completed"][] = $data;
                }
      }else {
        $output['msg'] = "error cannot execute query ";

    }
    }

}

echo json_encode($output, JSON_PRETTY_PRINT);

mysqli_close($con);
