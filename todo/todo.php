<?
if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    // This is just a list of sample tasks
    // You will need to write code that persistently stores and retrieves tasks
    $sampleTasks = array(
	array("id" => "4f946e5ed65fb",
	      "name" => "Something important I think",
	      "deadline" => 1415681940,
	      "notes" => "Probably for English class or something"),
	array("id" => "4f946d7a31b27",
	      "name" => "CMSC 433 PHP Project",
	      "deadline" => 1418533140,
	      "notes" => "Still need to finish the third part"),
	array("id" => "4f946fc11ac99",
	      "name" => "CMSC 433 Final Exam",
	      "deadline" => 1418684400,
	      "notes" => "SOND 112"),
	array("id" => "4f946fc11ac00",
	      "name" => "php  Exam",
	      "deadline" => 1418683333,
	      "notes" => "Sundar "),
	array("id" => "4f946d528fe08",
	      "name" => "New Years party stuff",
	      "deadline" => 1420001940,
	      "notes" => ""));

    // Handle query requests
    // This request is mostly done for you
    // You will need to load the list of stored tasks instead of using
    // the sample tasks
    if ($_GET["request"] == "query")
    {
	// Search array of tasks
	foreach ($sampleTasks as $idx => $task)
	{
	    // Found the task - append status ok and respond
	    if ($task["id"] == $_GET["id"])
	    {
		$response = $task;
		$response["status"] = "ok";
		echo json_encode($response);
		exit();
	    }
	}

	// Task with given ID doesn't exist
	$message = "No event matches that ID";
	$response = array("status" => "error", "message" => $message);
	echo json_encode($response);
    }
    else if ($_GET["request"] == "view")
    {
	// Viewing tasks - just return all of them
	// You will need to write code to load events and filter based on time
	$response = array("status" => "ok", "events" => $sampleTasks);
	echo json_encode($response);
    }
    else
    {
	// Unknown request type was submitted
	$message = "Unrecognized request type";
	echo json_encode(array("status" => "error", "message" => $message));
    }
}
else if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    // Say whatever the user wanted to do was successful
    $action = $_POST["action"];
    $action .= $action[strlen($action) - 1] == "e" ? "d" : "ed";

    $message = "Successfully $action event";

    echo json_encode(array("status" => "ok", "message" => $message));
}
else
{
    // Unknown request type was submitted
    $message = "Unrecognized request type";
    echo json_encode(array("status" => "error", "message" => $message));
}

?>
