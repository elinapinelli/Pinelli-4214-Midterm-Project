function display_tasks(filter="all",sort="aa"){
    $("#filters_h5").text("Filter By : "+filter+" , Sort By : "+sort)
    if(task_list.length===1){
        $("#h3_table").text("Table of Tasks ("+task_list.length+" task)")
    }
    else{
        $("#h3_table").text("Table of Tasks ("+task_list.length+" tasks)")
    }
    
    $("#table_body").empty(); // empty the task table with jquery
    if(filter==="completed"){
        filter=true
    }
    else if(filter==="pending"){
        filter=false
    }
    
    if (sort!=="aa"){
        task_list.sort(function(a,b){
            return a[sort].localeCompare(b[sort])
        })
    }
    else{
        task_list=readFromLocalStorage("task_list")
    }
    for(let i=0; i<task_list.length; i++){
        if(filter==="all" || filter===task_list[i].status){
            let tr = $('<tr></tr>'); // create tr element with jquery
            let th = $('<th></th>');
            th.attr('scope', 'row');
            th.text(i+1); // Set the content to '1'    
            let td1 = $('<td></td>');
            td1.text(task_list[i].name);
            let td2 = $('<td></td>');
            td2.text(task_list[i].description);
            let td3 = $('<td></td>');
            td3.text(task_list[i].date);
            let td4 = $('<td></td>');
            let td5 = $('<td></td>');
            let td6 = $('<td></td>');
            let td7 = $('<td></td>');
            
            // Edit button
            let btn5 = $('<button></button>');
            btn5.text("Edit");
            btn5.attr('class', 'btn btn-outline-warning');
            btn5.click(function(){
                let aa = i+1;
                $("#form_title").text("Update Task " + aa);
                $("#name").val(task_list[i].name);   
                $("#description").val(task_list[i].description);
                $("#date").val(task_list[i].date);
                to_update = i;
                status_to_update=task_list[i].status
                $('html, body').animate({ scrollTop: 0 }, 'slow'); // Scroll up to the top
                
            });

            // Delete button
            let btn6 = $('<button></button>');
            btn6.text("Delete");
            btn6.attr('class', 'btn btn-outline-danger');
            btn6.click(function(){
                latest_tasks["deleted"]=task_list[i]
                writeToLocalStorage("latest_tasks", latest_tasks)

                task_list.splice(i, 1); // remove task from tasks list
                writeToLocalStorage("task_list", task_list)
                display_tasks();
            });

            // Completed button
            let btn7 = $('<button></button>');
            btn7.text("Completed");
            
            if(task_list[i].status === true){
                td4.text("completed");
                btn7.attr('disabled', 'true');
            }
            else{
                td4.text("pending");
                btn7.attr('class', 'btn btn-outline-success');
                btn7.click(function(){
                    task_list[i].status = true;
                    latest_tasks["completed"]=task_list[i]
                    writeToLocalStorage("latest_tasks", latest_tasks)

                    writeToLocalStorage("task_list", task_list)
                    display_tasks();
                });
            }

            td5.append(btn5);
            td6.append(btn6);
            td7.append(btn7);

            tr.append(th);
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
            tr.append(td7);

            $("#table_body").append(tr);

        }
        
    }
    
    
}

function filtering(){
    $('.dropdown-item').click(function() {
        let filterType = $(this).data('filter');
        if( filterType!=null){
            filter_by=filterType
        }
        let sortType = $(this).data('sort');
        if( sortType!=null){
            sort_by=sortType
        }
        // alert(filter_by+" "+sort_by)
        display_tasks(filter_by,sort_by)
        
    })
}

