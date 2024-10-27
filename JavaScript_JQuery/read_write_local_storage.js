function writeToLocalStorage(key, jsonData) {
    // Convert JSON array to string and store it in localStorage
    localStorage.setItem(key, JSON.stringify(jsonData));
}
function readFromLocalStorage(key) {
    // Retrieve the data from localStorage and parse it back to JSON
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        if(key=="task_list"){
            return []; // Return empty array if no data is found
        }
        else if(key=="latest_tasks"){
            return {}
        }
        
    }
}