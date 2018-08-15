<?php


$con = mysqli_connect("localhost","root","","todoApp");
mysqli_set_charset($con, "utf8");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }