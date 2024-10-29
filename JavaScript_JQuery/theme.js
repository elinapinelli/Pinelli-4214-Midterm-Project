function change_theme() {
    // Set up a click event listener on the element with the ID "colors_mode"
    $("#colors_mode").click(function() {
        // Get the current theme mode from the HTML element's data attribute
        let mode_theme = $('html').attr('data-bs-theme');
        let new_theme = ""; // Initialize a variable to hold the new theme

        // Toggle between "dark" and "light" themes
        if (mode_theme === "dark") {
            new_theme = "light"; // Change to light theme if currently dark
        } else {
            new_theme = "dark"; // Change to dark theme if currently light
        }

        // Update the HTML element's data attribute to apply the new theme
        $('html').attr('data-bs-theme', new_theme);
        writeToLocalStorage("theme", new_theme)//from read_write_local_storage.js
    });
}


function set_theme(){
    let new_theme=readFromLocalStorage("theme")
    $('html').attr('data-bs-theme', new_theme);//from read_write_local_storage.js
}