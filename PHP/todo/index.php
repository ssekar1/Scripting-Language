<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- jQuery -->
    <script src="js/jquery-1.11.1.min.js"></script>

    <!-- jQuery Cookie -->
    <script src="js/jquery.cookie.js"></script>
    
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap.min.js"></script>

    <!-- Custom JS -->
    <script src="js/custom.js"></script>
    
    <title>Todo List</title>
  </head>
  
  <body>
    <!-- Navbar -->
    <? include("./navbar.php"); ?>

    <!-- Add Task button -->
    <? include("./add-button.php"); ?>

    <!-- Message area -->
    <div class="container" id="messages">
      
    </div>

    <!-- Render Task List -->
    <div class="container" id="content">
      
    </div>

    <!-- Task input dialog -->
    <? include("./input-dialog.php"); ?>
  </body>
</html>
