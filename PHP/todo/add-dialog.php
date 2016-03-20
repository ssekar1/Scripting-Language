<? function dateTimeButton($id, $placeholder, $size) { ?>
  <input type="text"
	 name="<?= $id ?>"
	 id="<?= $id ?>"
	 placeholder="<?= $placeholder ?>"
	 size="<?= $size ?>"
	 maxlength="<?= $size ?>">
<? } ?>

<div class="modal fade" id="add-modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">

	<!-- Close button -->
	<button type="button"
		class="close"
		data-dismiss="modal"
		id="input-exit">
	  &times;
	</button>

	<!-- Title -->
	<h4 class="modal-title" id="add-title">Add Task</h4>
      </div>
      <div class="modal-body">
	<form>
	  <!-- Task name -->
	  <div class="form-group">
	    <label for="add-task-name">Task Name</label>
	    <input type="text"
		   class="form-control"
		   id="add-task-name"
		   name="add-task-name"
		   placeholder="Enter task name">
	  </div>
	  
	  <!-- Deadline -->
	  <div class="form-group">
	    <p><strong>Deadline</strong></p>
	    <? dateTimeButton("add-month", "mm", 2); ?> /
	    <? dateTimeButton("add-date", "dd", 2); ?> /
	    <? dateTimeButton("add-year", "yyyy", 4); ?>
	  </div>

	  <div class="form-group">
	    <? dateTimeButton("add-hour", "HH", 2); ?> :
	    <? dateTimeButton("add-minute", "MM", 2); ?>
	  </div>
	</form>
	<div id="input-errors">
	</div>
      </div>
      <div class="modal-footer">
	<button type="button"
		class="btn btn-default"
		data-dismiss="modal"
		id="input-close">
	  Close
	</button>
	<button type="button"
		class="btn btn-primary"
		data-dismiss="modal"
		id="input-submit">
	  Submit
	</button>
      </div>
    </div>
  </div>
</div>
