// Function to display the latest activities
function latest_activities() {

    // Define a list of activity types
    let latest_list = ["new", "deleted", "edit", "completed"];

    // Loop through each activity type
    for (let i = 0; i < latest_list.length; i++) {
        // Create a main div element with jQuery for each activity
        let main_div = $('<div></div>');
        main_div.attr('class', 'card'); // Assign 'card' class to main div for styling

        // Create an h5 element for the card header
        let h5 = $('<h5></h5>');
        
        // Check if the activity type is 'edit', and set the header text accordingly
        if (latest_list[i] === "edit") {
            h5.text("edited");
        } else {
            h5.text(latest_list[i]); // Use the activity type as the text for other cases
        }

        h5.attr('class', 'card-header'); // Assign 'card-header' class to the header

        // Create a div for the card body
        let body_div = $('<div></div>');
        body_div.attr('class', 'card-body'); // Assign 'card-body' class for styling

        // Check if the current activity exists in 'latest_tasks' object
        if (!latest_tasks.hasOwnProperty(latest_list[i])) {
            // If not found, create a paragraph element indicating no activity
            let p_not_found = $('<p></p>');
            p_not_found.attr('class', 'card-text');
            p_not_found.text("There is no " + latest_list[i] + " latest activity yet!");
            body_div.append(p_not_found); // Append the 'not found' paragraph to the card body
        } else {
            // Create an h5 element for the task title
            let h5_card_title = $('<h5></h5>');
            h5_card_title.attr('class', 'card-title');
            h5_card_title.text(latest_tasks[latest_list[i]]["name"]); // Set the title from 'latest_tasks'

            // Create a paragraph element for the task date
            let p_date = $('<p></p>');
            p_date.attr('class', 'card-text');
            p_date.text("Date : " + latest_tasks[latest_list[i]]["date"]);

            // Create a paragraph element for the task status
            let p_status = $('<p></p>');
            p_status.attr('class', 'card-text');
            // Check if the task status is true (completed), and set the text accordingly
            if (latest_tasks[latest_list[i]]["status"] === true) {
                p_status.text("Status : Completed");
            } else {
                p_status.text("Status : pending");
            }

            // Create a paragraph element for the task description
            let p_description = $('<p></p>');
            p_description.attr('class', 'card-text');
            p_description.text(latest_tasks[latest_list[i]]["description"]);

            // Append all the created elements to the card body
            body_div.append(h5_card_title);
            body_div.append(p_date);
            body_div.append(p_status);
            body_div.append(p_description);
        }

        // Append the header and body to the main div
        main_div.append(h5);
        main_div.append(body_div);

        // Finally, append the main div to the element with id 'latests'
        $("#latests").append(main_div);
    }
}
