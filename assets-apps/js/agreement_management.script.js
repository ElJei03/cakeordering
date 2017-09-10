$(document).ready(function() {



    loadAgreementMsg();


    $('.summernote').summernote({});
    $('#btn_view').click(function() {
        var code = $('#view').html();
        $('.note-editable').html(code);
        $('#container-message').hide();
        $('#container-message-editor').show();
    });
    $('#btn_save').click(function() {
        var code = $('.summernote').code();
        $('#view').html(code);

        var _data = [];
        _data.push({
            name: "agreement_id",
            value: 13
        });


        _data.push({
            name: "agreement_message",
            value: code
        });

        $.ajax({
            "dataType": "json",
            "type": "POST",
            "url": http + "Agreements/transaction/update",
            "data": _data,
            "beforeSend": function() {

                }

                ,
            error: function(xhr, status, error) {
                // check status && error
                console.log(xhr);
            }


        }).done(function(response) {
            showNotification(response);

            loadAgreementMsg();


        }).always(function() {

        });




        $('#container-message-editor').hide();
        $('#container-message').show();
    });


    $('#btn_close').click(function() {

        $('#container-message-editor').hide();
        $('#container-message').show();
    });

    function loadAgreementMsg() {

        $.ajax({
            dataType: "json",
            type: "POST",
            url: http + 'Agreements/transaction/list', //call controller class/function to execute

            success: function(response) {


                $.each(response.data, function(index, value) {


                    $('#view').html(value.agreement_message);
                });

            },
            error: function(xhr, status, error) {
                // check status && error
                console.log(xhr);
            }
        });


    }
});