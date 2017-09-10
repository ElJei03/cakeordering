

$('#btn_login').click(function() {
    var btn = $(this);
    var f = $('#frm_login');




    if (validateRequiredFields(f)) {

        var _data = f.serializeArray(); //serialize data in array format



        $.ajax({
            "dataType": "json",
            "type": "POST",
            "url": "../backend/Users/auth_user",
            "data": _data,
            "beforeSend": function() {
                //  showSpinningProgress(btn);
            },
            error: function(xhr, status, error) {
                // check status && error
                console.log(xhr);
            }
        }).done(function(response) {
            console.log(response)
            showNotification(response);
           
            if (response.stat == "success") {
               session(response.result[0]);
                setTimeout(function() {
                    window.location.href = 'dashboard';
                }, 600);

            }

        }).always(function() {

        });


    }
});


      $('input').keypress(function(evt){
                    if(evt.keyCode==13){ $('#btn_login').click(); }
                });
