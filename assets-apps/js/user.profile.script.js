 $(function() {

     loadInfo();

     $('#btn_update_record').click(function() {
         var btn = $(this);
         var f = $('#frm_data');

         if (validateRequiredFields(f)) {

             var _data = f.serializeArray(); //serialize data in array format



             _data.push({
                 name: "user_account_id",
                 value: localStorage.user_account_id
             });

             _data.push({
                 name: "user_photo",
                 value: $('#user_photo').attr('src')
             });

             $.ajax({
                 "dataType": "json",
                 "type": "POST",
                 "url": http + "Users/transaction/update",
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




                 if (response.stat == "success") {
                     session(response.row_updated[0]);
                     setTimeout(function() {
                         window.location.href = '../profile';
                     }, 1000);

                 }
             }).always(function() {

             });



         }
     });




     $('#btn_browse').click(function(event) {
         event.preventDefault();
         $('input[name="file_upload[]"]').click();
     });


     $('#btn_remove_photo').click(function(event) {
         event.preventDefault();
         $('#user_photo').attr('src', '../../assets-apps/img/anonymous-icon.png');

     });




     $('input[name="file_upload[]"]').change(function(event) {
         var _files = event.target.files;

         $('#div_img_user').hide();
         $('#div_img_loader').show();


         var data = new FormData();
         $.each(_files, function(key, value) {
             data.append(key, value);
         });


         $.ajax({
             url: http + 'Users/transaction/upload',
             type: "POST",
             data: data,
             cache: false,
             dataType: 'json',
             processData: false,
             contentType: false,
             success: function(response) {
                 //console.log(response);

                 $('#div_img_loader').hide();
                 $('#div_img_user').show();
                 $('#user_photo').attr('src', http + response.path);


                 console.log(http + response.path);
             }
         });

     });



     function loadInfo() {

         $('#user_uname').val(localStorage.user_uname);
         $('#user_fname').val(localStorage.user_fname);
         $('#user_mname').val(localStorage.user_mname);
         $('#user_lname').val(localStorage.user_lname);
         $('#address').val(localStorage.address);
         $('#user_email').val(localStorage.user_email);
         $('#contact_no').val(localStorage.contact_no);
         $('#user_bdate').val(localStorage.user_bdate);
         $('#user_photo').attr('src', localStorage.user_photo);
     }
 });