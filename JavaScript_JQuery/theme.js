function change_theme(){
    $("#colors_mode").click(function(){
            
        // let html_el=document.documentElement
        let mode_theme=$('html').attr('data-bs-theme');
        let new_theme=""
        if (mode_theme==="dark"){
            new_theme="light"
        }
        else{
            new_theme="dark"   
        }
        $('html').attr('data-bs-theme',new_theme);
    })
}