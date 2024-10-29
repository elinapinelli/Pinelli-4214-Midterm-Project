// Function to write data to localStorage
function writeToLocalStorage(key, jsonData) {
    if(key==="theme"){
        localStorage.setItem(key, jsonData);
    }
    else{
        // Convert the JSON object or array to a string and store it in localStorage using the specified key
        localStorage.setItem(key, JSON.stringify(jsonData));
    }
    
}

// Function to read data from localStorage
function readFromLocalStorage(key) {
    // Retrieve the data from localStorage associated with the given key
    let data = localStorage.getItem(key);
    
    // Check if the data exists in localStorage
    if (data) {
        if(key==="theme"){
            return data
        }
        else{
            // Parse and return the JSON string back to its original form (object or array)
            return JSON.parse(data);
        }
    } else {
        // If the key is "task_list" and no data is found, return an empty array
        if (key === "task_list") {
            return []; 
        }
        // If the key is "latest_tasks" and no data is found, return an empty object
        else if (key === "latest_tasks") {
            return {};
        }
        else if(key==="theme"){
            writeToLocalStorage(key, "dark")
            return "dark"
        }
    }
}
