<?php
/**
 * Create by @VanSoftware
 * Date: 09/06/2018
 * Time: 16:42
 */
include_once("../config.php");
if(!isDataSet($_GET['pw'],DATA_TYPE_STRING)) exit("Add password to has as 'pw=' GET param.");
echo User::hashPassword($_GET['pw']);