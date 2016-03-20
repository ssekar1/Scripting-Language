function successPar(msg)
{
    var successIcon = '<span class="glyphicon glyphicon-thumbs-up"></span> ';
    return '<p class="text-success">' + successIcon + msg + '</p>';
}

function warningPar(msg)
{
    var errorIcon = '<span class="glyphicon glyphicon-warning-sign"></span> ';
    return '<p class="text-danger">' + errorIcon + msg + '</p>';
}

function removeInputWarning(msg)
{
    var text = $("#input-errors").html();
    $("#input-errors").html(text.replace(warningPar(msg), ""));
}

function validateField(id, errorMsg, validateFunction)
{
    $(id).parent().removeClass("has-error");

    if (!validateFunction())
    {
	$(id).parent().addClass("has-error");
	if ($("#input-errors").html().indexOf(warningPar(errorMsg)) === -1)
	{
	    $("#input-errors").append(warningPar(errorMsg));
	}
	return false;
    }
    
    removeInputWarning(errorMsg);
    return true;
}

function validateName()
{
    var errorMsg = "Task name cannot be blank!";

    function isValid()
    {
	return ! $("#input-task-name").val().length == 0;
    }

    validateField("#input-task-name", errorMsg, isValid);
}

function evalRegex(id, regex)
{
    return function()
    {
	return regex.test($(id).val());
    };
}

function validateMonth()
{
    var errorMsg = "Month must be a number between 1 and 12!";
    var isValid = evalRegex("#input-month", /^(1[0-2]|0?[1-9])$/);

    if ($("#input-date").val().length != 0)
    {
	validateDate();
    }

    validateField("#input-month", errorMsg, isValid);
}

function isLeapYear(year)
{
    return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}

function validateDate()
{
    var dateRegex = /^(0?[1-9]|[12]\d|3[01])$/;
    var maxDate = 31;
    var month = $("#input-month").val();
    var year = $("#input-year").val();

    if (month == 4 || month == 6 || month == 9 || month == 11)
    {
	dateRegex = /^(0?[1-9]|[12]\d|30)$/;
	maxDate = 30;
    }
    else if (month == 2 && !isLeapYear(year))
    {
	dateRegex = /^(0?[1-9]|1\d|2[0-8])$/;
	maxDate = 28;
    }
    else if (month == 2 && isLeapYear(year))
    {
	dateRegex = /^(0?[1-9]|[12]\d)$/;
	maxDate = 29;
    }

    var errorMsg = "Date must be a number between 1 and " + maxDate + "!";
    var isValid = evalRegex("#input-date", dateRegex);
    
    if ($("#input-errors").html().indexOf(warningPar(errorMsg)) == -1)
    {
	$("#input-errors :contains('Date must be')").remove();
    }
    
    validateField("#input-date", errorMsg, isValid);
}

function validateYear()
{
    var errorMsg = "Year must be a positive number!";
    var isValid = evalRegex("#input-year", /^\d{1,4}$/);

    if ($("#input-date").val().length != 0)
    {
	validateDate();
    }

    validateField("#input-year", errorMsg, isValid);
}

function validateHour()
{
    var errorMsg = "Hour must be a number between 0 and 23!";
    var isValid = evalRegex("#input-hour", /^([01]?\d|2[0-3])$/);
    validateField("#input-hour", errorMsg, isValid);
}

function validateMinute()
{
    var errorMsg = "Minute must be a number between 0 and 59!";
    var isValid = evalRegex("#input-minute", /^(0?\d|[1-5]\d)$/);
    validateField("#input-minute", errorMsg, isValid);
}

function validateSubmission(data)
{
    validateName();
    validateMonth();
    validateDate();
    validateYear();
    validateHour();
    validateMinute();

    if ($("#input-errors").html().trim().length != 0)
    {
	return false;
    }

    var dateObj = new Date($("#input-year").val(),
			   $("#input-month").val() - 1,
			   $("#input-date").val(),
			   $("#input-hour").val(),
			   $("#input-minute").val());

    var dataObj = {
	action: data.data.action,
	name: $("#input-task-name").val(),
	deadline: dateObj.getTime() / 1000,
	notes: $("#input-notes").val()
    };

    if (dataObj.action != "create")
    {
	dataObj.id = data.data.id;
    }

    $.post("todo.php", dataObj, postSuccess).fail(displayFail);
}

function focusInput()
{
    $("#input-task-name").focus();
}

function taskTable()
{
    return '<table class="table" id="task-table">' +
		   "<thead>" +
		   '<tr><th style="width: 10%"></th>' +
		   "<th>Task</th><th>Deadline</th></tr>" +
		   "</thead>" +
		   "<tbody></tbody>" + 
		   '</table>';
}

function strDate(dateObj)
{
    var dateStr = (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/";
    dateStr += dateObj.getFullYear();
    dateStr += " " + dateObj.getHours() + ":";
    if (dateObj.getMinutes() < 10)
    {
	dateStr += "0";
    }
    dateStr += dateObj.getMinutes();
    return dateStr;
}

function displayTask(idx, task)
{
    var currentTime = (new Date()).getTime() / 1000;
    var status = "info";

    if (task.deadline < currentTime)
    {
	status = "danger";
    }
    else if (task.deadline - currentTime < 3600)
    {
	status = "warning";
    }

    var taskText = '<tr class="' + status + '" ';
    taskText += 'id="' + task.id + '"';
    taskText += '>';
    taskText += "<td>";
    taskText += '<div class="btn-group btn-group-xs">';
    taskText += '<button class="btn btn-default">';
    taskText += '<span class="glyphicon glyphicon-remove"></span>';
    taskText += "</button>";
    taskText += '<button class="btn btn-default" ';
    taskText += 'data-toggle="modal" data-target="#input-modal">';
    taskText += '<span class="glyphicon glyphicon-pencil"></span>';
    taskText += "</button>";
    taskText += "</div>";
    taskText += "</td>";
    taskText += "<td>";
    taskText += "<span";
    if (task.notes != "")
    {
	taskText += ' data-container="body" data-toggle="popover" ';
	taskText += 'data-placement="top" ';
	taskText += 'data-content="' + task.notes + '"';
    }
    taskText += ">" + task.name + "</span></td>";
    taskText += "<td>" + strDate(new Date(task.deadline * 1000)) + "</td>";
    taskText += "</tr>";

    $("#task-table>tbody").append(taskText);
}

function getTaskId(element)
{
    return $(element).parent().parent().parent().attr("id");
}

function deleteTask()
{
    var dataObj = {
	action: "delete",
	id: getTaskId(this)
    };

    $.post("todo.php", dataObj, postSuccess).fail(displayFail);
}

function populateDialog(response)
{
    if (response.status == "ok")
    {
	var dateObj = new Date(response.deadline * 1000);
	$("#input-task-name").val(response.name);
	$("#input-notes").val(response.notes);
	$("#input-month").val(dateObj.getMonth() + 1);
	$("#input-date").val(dateObj.getDate());
	$("#input-year").val(dateObj.getFullYear());
	$("#input-hour").val(dateObj.getHours());
	$("#input-minute").val(dateObj.getMinutes());
    }
}

function editTask(event)
{
    event.data = {title: "Edit Task", action: "edit", id: getTaskId(this)};
    openDialog(event);

    var requestObj = {request: "query", id: getTaskId(this)};
    $.getJSON("todo.php", requestObj, populateDialog);
}

function displayContent(response)
{
    if (response.status == "ok")
    {
	// Uncomment line below for debugging
	// console.log(JSON.stringify(response));
	
	if (response.events.length == 0)
	{
	    $("#content").html("You have nothing to do right now...");
	}
	else
	{
	    $("#content").html(taskTable());
	    $(response.events).each(displayTask);
	    $("#task-table>tbody>tr>td:nth-child(2)>span").popover();

	    // Delete buttons
	    $("#task-table>tbody>tr>td button:first-child").click(deleteTask);

	    // Edit buttons
	    $("#task-table>tbody>tr>td button:last-child").click(editTask);
	}
    }
    else
    {
	$("#messages").append(warningPar(jsonResponse.message));
	setTimeout(removeFirstMsg, 5000);
    }
}

function removeFirstMsg()
{
    $("#messages :first-child").remove();
}

function displayFail()
{
    var msg = " An error occurred while communicating with the server. ";
    msg += "Please try again later.";
    $("#messages").append(warningPar(msg));

    setTimeout(removeFirstMsg, 5000);
}

function postSuccess(response)
{
    var jsonResponse = JSON.parse(response);
    if (jsonResponse.status == "ok")
    {
	$("#messages").append(successPar(jsonResponse.message));
	
	// Uncomment the line below to see the POST request for debugging
	// console.log(JSON.stringify(jsonResponse));

	setTimeout(removeFirstMsg, 5000);
	refreshView();
    }
    else
    {
	$("#messages").append(warningPar(jsonResponse.message));
	setTimeout(removeFirstMsg, 5000);
    }
}

/*
 * Clear all text fields in the add/edit task dialog
 */
function resetForm()
{
    $("#input-form :text,#input-form textarea")
	   .val("")
	   .parent()
	   .removeClass("has-error");
    $("#input-errors").html("");
    $("#input-submit").unbind("click");
}

/*
 * Remove active class from all nav buttons.
 */
function deactivateNavs()
{
    $(".nav .navbar-btn").parent().removeClass("active");
}

/*
 * Open the dialog to add or edit an event
 * 
 * Params: event - the associated event, which holds the data
 * for the title and submission action.
 */
function openDialog(event)
{
    $("#input-title").text(event.data.title);    
    $("#input-submit").click({action: event.data.action, id: event.data.id},
			     validateSubmission);
}

function navClick()
{
    var enclosingListItem = $(this).parent();
    var viewType = enclosingListItem.attr("id").replace("view-", "");

    deactivateNavs();
    enclosingListItem.addClass("active");
    $.cookie("view-mode", viewType);

    var requestObj = {request: "view", view: viewType};

    if (viewType == "day")
    {
	var today = new Date();
	requestObj.start = new Date(today.getFullYear(),
				    today.getMonth(),
				    today.getDate()).getTime() / 1000;
	requestObj.end = new Date(today.getFullYear(),
				  today.getMonth(),
				  today.getDate(),
				  23,
				  59).getTime() / 1000;
    }
    else if (viewType == "week")
    {
	var today = new Date();
	requestObj.start = new Date(today.getFullYear(),
				    today.getMonth(),
				    today.getDate() - today.getDay())
		  .getTime() / 1000;
	requestObj.end = new Date(today.getFullYear(),
				  today.getMonth(),
				  today.getDate() - today.getDay() + 7,
				  0,
				  -1).getTime() / 1000;
	
    }
    else if (viewType == "month")
    {
	var today = new Date();
	requestObj.start = new Date(today.getFullYear(),
				    today.getMonth(),
				    1).getTime() / 1000;
	requestObj.end = new Date(today.getFullYear(),
				  today.getMonth() + 1,
				  0,
				  23,
				  59).getTime() / 1000;
    }

    $.getJSON("todo.php", requestObj, displayContent).fail(displayFail);

    return false;
}

function refreshView()
{
    if ($("#view-" + $.cookie("view-mode") + ">a").click().length === 0)
    {
	$("#view-all>a").click();
    }
}

$(
    function()
    {
	// Click handlers for nav buttons
	$(".nav .navbar-btn").click(navClick);

	// Click handler for add button
	$("#add-btn").click({title: "Add Task", action: "create", id: ""},
			    openDialog);

	// Focus on the name textbox
	$("#input-modal").on("shown.bs.modal", focusInput);

	// When input fields blur, make sure they are valid
	// keyups used to be blurs
	$("#input-task-name").keyup(validateName);
	$("#input-month").keyup(validateMonth);
	$("#input-date").keyup(validateDate);
	$("#input-year").keyup(validateYear);
	$("#input-hour").keyup(validateHour);
	$("#input-minute").keyup(validateMinute);

	// Reset the form when the modal goes away
	$("#input-modal").on("hide.bs.modal", resetForm);

	// Handle submission of event
	//$("#input-submit").click(validateSubmission);

	// Set up initial view
	refreshView();
    }
);
