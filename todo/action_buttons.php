<? function actionButton($id, $name) { ?>
  <button type="button" class="btn btn-primary" id="<?= $id ?>">
    <?= $name ?>
  </button>
<? } ?>

<div class="container-fluid">
  <div class="btn-group pull-right" role="group">
    <?
    $plusIcon = '<span class="glyphicon glyphicon-plus"></span>';
    actionButton("add-btn", "$plusIcon Add Task")
    ?>
  </div>
</div>
