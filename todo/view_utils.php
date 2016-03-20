<?
define("DEFAULT_VIEW", "month");

function getView()
{
    $validViews = array("list", "month", "week", "day");
    return in_array($_GET["view"], $validViews) ? $_GET["view"] : DEFAULT_VIEW;
}
?>
