function display_tasks(filter = "all", sort = "aa") {
    // Update the filter and sort display text
    $("#filters_h5").text("Filter By : " + filter + " , Sort By : " + sort);

    // Set the table header based on the number of tasks
    if (task_list.length === 1) {
        $("#h3_table").text("Table of Tasks (" + task_list.length + " task)");
    } else {
        $("#h3_table").text("Table of Tasks (" + task_list.length + " tasks)");
    }

    // Clear the task table body
    $("#table_body").empty(); // empty the task table with jQuery

    // Set filter criteria based on the filter type
    if (filter === "completed") {
        filter = true;
    } else if (filter === "pending") {
        filter = false;
    }

    // Sort the task list based on the selected sort criteria
    if (sort !== "aa") {
        task_list.sort(function(a, b) {
            return a[sort].localeCompare(b[sort]);
        });
    } else {
        task_list = readFromLocalStorage("task_list");
    }

    // Loop through the task list and display each task based on the filter
    for (let i = 0; i < task_list.length; i++) {
        // Check if the task should be displayed based on the filter
        if (filter === "all" || filter === task_list[i].status) {
            let tr = $('<tr></tr>'); // Create a new table row element with jQuery
            let th = $('<th></th>').attr('scope', 'row').text(i + 1); // Row number

            // Create table data cells for task details
            let td1 = $('<td></td>').text(task_list[i].name); // Task name
            let td2 = $('<td></td>').text(task_list[i].description); // Task description
            let td3 = $('<td></td>').text(task_list[i].date); // Task date
            let td4 = $('<td></td>'); // Status cell
            let td5 = $('<td></td>'); // Edit button cell
            let td6 = $('<td></td>'); // Delete button cell
            let td7 = $('<td></td>'); // Completed button cell

            // Create and configure the Edit button
            let btn5 = $('<button></button>')
                .text("Edit")
                .attr('class', 'btn btn-outline-warning')
                .click(function() {
                    let aa = i + 1; // Adjust for display purposes
                    $("#form_title").text("Update Task " + aa);
                    $("#name").val(task_list[i].name);   
                    $("#description").val(task_list[i].description);
                    $("#date").val(task_list[i].date);
                    to_update = i; // Set the index to update
                    status_to_update = task_list[i].status; // Save current status
                    $('html, body').animate({ scrollTop: 0 }, 'slow'); // Scroll to top
                });

            // Create and configure the Delete button
            let btn6 = $('<button></button>')
                .text("Delete")
                .attr('class', 'btn btn-outline-danger')
                .click(function() {
                    latest_tasks["deleted"] = task_list[i]; // Save deleted task
                    writeToLocalStorage("latest_tasks", latest_tasks);
                    task_list.splice(i, 1); // Remove task from the task list
                    writeToLocalStorage("task_list", task_list); // Update storage
                    display_tasks(); // Refresh the task display
                });

            // Create and configure the Completed button
            let btn7 = $('<button></button>').text("Completed");
            if (task_list[i].status === true) {
                td4.text("completed");
                btn7.attr('disabled', 'true'); // Disable if already completed
            } else {
                td4.text("pending");
                btn7.attr('class', 'btn btn-outline-success')
                    .click(function() {
                        task_list[i].status = true; // Mark task as completed
                        latest_tasks["completed"] = task_list[i]; // Save completed task
                        writeToLocalStorage("latest_tasks", latest_tasks);
                        writeToLocalStorage("task_list", task_list); // Update storage
                        display_tasks(); // Refresh the task display
                    });
            }

            // Append buttons to their respective cells
            td5.append(btn5);
            td6.append(btn6);
            td7.append(btn7);

            // Append all cells to the row
            tr.append(th).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);

            // Append the row to the table body
            $("#table_body").append(tr);
        }
    }
}

function filtering() {
    // Set up click event for dropdown items
    $('.dropdown-item').click(function() {
        let filterType = $(this).data('filter'); // Get filter type from data attribute
        if (filterType != null) {
            filter_by = filterType; // Update global filter variable
        }
        let sortType = $(this).data('sort'); // Get sort type from data attribute
        if (sortType != null) {
            sort_by = sortType; // Update global sort variable
        }
        // Call display_tasks with selected filter and sort options
        display_tasks(filter_by, sort_by);
    });
}

function to_submit_task() {
    $(document).ready(function(){
        $("#myform").submit(function (event){
            event.preventDefault();
            let name = $("#name").val();
            let description = $("#description").val();
            let date = $("#date").val();
           
            if(name === ""){
                alert("You must enter name !!!");
            }
            else if(description === ""){
                alert("You must enter description !!!");
            }
            else if(date === ""){
                alert("You must enter date !!!");
            }
            else{
                let task = {"name":name, "description":description, "date":date, "status":status_to_update};
                if(to_update < 0){ //insert
                    task_list.push(task);    
                    latest_tasks["new"]=task
                    writeToLocalStorage("latest_tasks", latest_tasks)
                }
                else{ //update
                    task_list[to_update] = task;
                    latest_tasks["edit"]=task_list[to_update]
                    writeToLocalStorage("latest_tasks", latest_tasks)
                    to_update = -1;
                    status_to_update=false
                }
                writeToLocalStorage("task_list", task_list)
                display_tasks();
                //empty the inputs
                $("#name").val("");
                $("#description").val("");
                $("#date").val("");
                $("#form_title").text("Add New Task Form");
            }
        });
    });
}