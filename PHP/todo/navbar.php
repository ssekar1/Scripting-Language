<?
include_once("view_utils.php");
$view = getView();

function navbarButton($id, $name)
{
?>
  <li role="presentation" id="<?= $id ?>">
    <a href="" class="navbar-btn btn-sm">
      <?= $name ?>
    </a>
  </li>
<? } ?>

<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <a class="navbar-brand" href="">Todo</a>
    <ul class="nav nav-pills navbar-right">
      <?
      navbarButton("view-all", "List All");
      ?>
      <li role="presentation" class="divider-vertical"></li>
      <?
      navbarButton("view-month", "List Month");
      navbarButton("view-week", "List Week");
      navbarButton("view-day", "List Day");
      ?>
    </ul>
  </div>
</nav>
