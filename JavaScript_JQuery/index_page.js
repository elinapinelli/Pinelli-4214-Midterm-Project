function latest_activities(){

    
    let latest_list=["new","deleted","edit","completed"]
    for(let i=0;i<latest_list.length;i++){
        let main_div = $('<div></div>'); // create tr element with jquery
        main_div.attr('class', 'card');
        let h5=$('<h5></h5>');
        if(latest_list[i]==="edit"){
            h5.text("edited")
        }
        else{
            h5.text(latest_list[i]);
        }
        
        h5.attr('class', 'card-header');
        let body_div = $('<div></div>');
        body_div.attr('class', 'card-body');
        if(!latest_tasks.hasOwnProperty(latest_list[i])){
            let p_not_found = $('<p></p>');
            p_not_found.attr('class', 'card-text');
            p_not_found.text("There is no "+latest_list[i]+" latest activity yet !");
            body_div.append(p_not_found)
        }else{
            let h5_card_title=$('<h5></h5>');
            h5_card_title.attr('class', 'card-title');
            
            h5_card_title.text(latest_tasks[latest_list[i]]["name"]);
            
            let p_date = $('<p></p>');
            p_date.attr('class', 'card-text');
            p_date.text("Date : "+latest_tasks[latest_list[i]]["date"]);
            let p_status = $('<p></p>');
            p_status.attr('class', 'card-text');
            if (latest_tasks[latest_list[i]]["status"]==true){
                p_status.text("Status : Completed");
            }
            else{
                p_status.text("Status : pending");
            }
            let p_description = $('<p></p>');
            p_description.attr('class', 'card-text');
            p_description.text(latest_tasks[latest_list[i]]["description"]);
            body_div.append(h5_card_title)
            body_div.append(p_date)
            body_div.append(p_status)
            body_div.append(p_description)
        }
        

        main_div.append(h5)             
        main_div.append(body_div)
        $("#latests").append(main_div);
    }
}