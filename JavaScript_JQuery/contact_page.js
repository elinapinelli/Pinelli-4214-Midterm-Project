function to_submit(){
    $("#myform").submit(function (event){
        let username = $("#username").val();
        let email = $("#email").val();
        let subject = $("#subject").val();
        let message = $("#message").val();

        let pop_up_str="You submited succesfully\nUsername: "+username+"\nEmail: "+email+"\nSubject: "+subject+"\nMessage: "+message
        alert(pop_up_str)
        
    });
} 