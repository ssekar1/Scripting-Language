<? function dateTimeButton($id, $placeholder, $size) { ?>
  <input type="text"
	 name="<?= $id ?>"
	 id="<?= $id ?>"
	 placeholder="<?= $placeholder ?>"
	 size="<?= $size ?>"
	 maxlength="<?= $size ?>">
<? } ?>

<div class="modal fade" id="input-modal" tabindex="-1">
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
	<h4 class="modal-title" id="input-title">Input Task</h4>
      </div>
      <div class="modal-body">
	<form id="input-form">
	  <!-- Task name -->
	  <div class="form-group">
	    <label for="input-task-name">Task Name</label>
	    <input type="text"
		   class="form-control"
		   id="input-task-name"
		   name="input-task-name"
		   placeholder="Enter task name">
	  </div>
	  
	  <!-- Deadline -->
	  <div class="form-group">
	    <p><strong>Deadline</strong></p>
	    <!-- Month/day/year -->
	    <? dateTimeButton("input-month", "mm", 2); ?> /
	    <? dateTimeButton("input-date", "dd", 2); ?> /
	    <? dateTimeButton("input-year", "yyyy", 4); ?>
	  </div>

	  <div class="form-group">
	    <!-- Hour:minute -->
	    <? dateTimeButton("input-hour", "HH", 2); ?> :
	    <? dateTimeButton("input-minute", "MM", 2); ?>
	  </div>

	  <!-- Notes -->
	  <div class="form-group">
	    <label for="input-notes">Notes</label>
	    <textarea class="form-control"
		      rows="3"
		      name="input-notes"
		      id="input-notes"></textarea>
	  </div>
	</form>
	<div id="input-errors">
	</div>
      </div>
      <div class="modal-footer">
	<!-- Close button -->
	<button type="button"
		class="btn btn-default"
		data-dismiss="modal"
		id="input-close">
	  Close
	</button>

	<!-- Submit button -->
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
