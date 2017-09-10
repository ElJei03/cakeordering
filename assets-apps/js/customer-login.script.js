

        
$('#btn_login').click(function() {
    var btn = $(this);
    var f = $('#frm_login');




    if (validateRequiredFields(f)) {

        var _data = f.serializeArray(); //serialize data in array format



        $.ajax({
            "dataType": "json",
            "type": "POST",
            "url": "/cakeordering/backend/Customers/auth_cust",
            "data": _data,
            "beforeSend": function() {
                //  showSpinningProgress(btn);
            },
            error: function(xhr, status, error) {
                // check status && error
            }
        }).done(function(response) {
            showNotification(response);
            if (response.stat == "success") {
               sessionCustomer(response.result[0]);
                setTimeout(function() {
                    window.location.href = 'customer/cake_builder';
                }, 600);

            }
           
        }).always(function() {

        });


    }
});


  
            $('#btn_register').click(function(){
                setTimeout(function(){
                    window.location.href = 'sign-up';
                 },600);
            });



                  $('input').keypress(function(evt){
                    if(evt.keyCode==13){ $('#btn_login').click(); }
                });
