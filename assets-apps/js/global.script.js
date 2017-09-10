$(function() {





if (localStorage.type == 'admin') {

   $('#main-fullname').html(localStorage.user_fname +" "+localStorage.user_mname +" "+localStorage.user_lname );

$('#main-photo').attr('src',localStorage.user_photo);;


} else {

  $('#main-fullname').html(localStorage.cust_fname +" "+localStorage.cust_mname +" "+localStorage.cust_lname );
$('#main-photo').attr('src',localStorage.cust_photo);
}


 
    $(document).on('click', '#btn-sign-out', function() {


if (localStorage.type == 'admin') {


        localStorage.clear();
        window.location.href = '../';   

    }else{


          localStorage.clear();
        window.location.href = '../../';   
    }

    })




});

//Cross Origin
//var http = 'http://localhost:8082/cakeordering/backend/';
//var http = 'http://localhost:8082/cakeordering/backend/';
var http = '../../backend/';

$('.date-picker').val("");
$('.date-picker').datepicker({
      dateFormat: 'yy-mm-dd',
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true,

});




var validateRequiredFields = function(f) {
    var stat = true;

    $('div.form-group').removeClass('has-error');
    $('input[required],textarea[required],select[required]', f).each(function() {

        if ($(this).is('select')) {
            if ($(this).select2('val') == 0 || $(this).select2('val') == null) {
                showNotification({
                    title: "Error!",
                    stat: "error",
                    msg: $(this).data('error-msg')
                });
                $(this).closest('div.form-group').addClass('has-error');
                $(this).focus();
                stat = false;
                return false;
            }
        } else {




            if ($(this).val() == "") {


                showNotification({
                    title: "Error!",
                    stat: "error",
                    msg: $(this).data('error-msg')
                });
                $(this).closest('div.form-group').addClass('has-error');
                $(this).focus();
                stat = false;
                return false;
            }
        }


    });

    return stat;
};


var clearFields = function(f) {
    $('input,textarea', f).val('');
    $(f).find('input:first').focus();

    $('.date-picker').val("");
};

var showNotification = function(obj) {
    PNotify.removeAll(); //remove all notifications
    new PNotify({
        title: obj.title,
        text: obj.msg,
        type: obj.stat
    });
};


var showSpinningProgress = function(e) {
    $(e).find('i').toggleClass('glyphicon glyphicon-refresh glyphicon-spinning');
};


var _required_token = function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    })

};


var session = function(obj){


localStorage.setItem("token", "nexuslifeline");
localStorage.setItem("user_account_id",obj.user_account_id);
localStorage.setItem("user_fname",obj.user_fname);
localStorage.setItem("user_mname",obj.user_mname);
localStorage.setItem("user_lname",obj.user_lname);
localStorage.setItem("user_uname",obj.user_uname);
localStorage.setItem("address",obj.address);
localStorage.setItem("user_email",obj.user_email);
localStorage.setItem("contact_no",obj.contact_no);
localStorage.setItem("user_bdate",obj.user_bdate);
localStorage.setItem("user_photo",obj.user_photo);
localStorage.setItem("type","admin");

  

};


var sessionCustomer = function(obj){


localStorage.setItem("token", "nexuslifeline");
localStorage.setItem("customer_id",obj.customer_id);
localStorage.setItem("cust_fname",obj.cust_fname);
localStorage.setItem("cust_mname",obj.cust_mname);
localStorage.setItem("cust_lname",obj.cust_lname);
localStorage.setItem("cust_uname",obj.cust_uname);
localStorage.setItem("address",obj.address);
localStorage.setItem("cust_email",obj.cust_email);
localStorage.setItem("contact_no",obj.contact_no);
localStorage.setItem("cust_bdate",obj.cust_bdate);
localStorage.setItem("cust_photo",obj.cust_photo);
localStorage.setItem("type","customer");


};