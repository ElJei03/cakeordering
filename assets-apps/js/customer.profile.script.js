 $(function() {

     loadInfo();

     $('#btn_update_record').click(function() {
         var btn = $(this);
         var f = $('#frm_data');

         if (validateRequiredFields(f)) {

             var _data = f.serializeArray(); //serialize data in array format



             _data.push({
                 name: "customer_id",
                 value: localStorage.customer_id
             });

             _data.push({
                 name: "cust_photo",
                 value: $('#cust_photo').attr('src')
             });

             $.ajax({
                 "dataType": "json",
                 "type": "POST",
                 "url": http + "Customers/transaction/update",
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
                     sessionCustomer(response.row_updated[0]);
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
         $('#cust_photo').attr('src', '../../assets-apps/img/anonymous-icon.png');

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
             url: http + 'Customers/transaction/upload',
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
                 $('#cust_photo').attr('src', http + response.path);


                 console.log(http + response.path);
             }
         });

     });



     function loadInfo() {

         $('#cust_uname').val(localStorage.cust_uname);
         $('#cust_fname').val(localStorage.cust_fname);
         $('#cust_mname').val(localStorage.cust_mname);
         $('#cust_lname').val(localStorage.cust_lname);
         $('#address').val(localStorage.address);
         $('#cust_email').val(localStorage.cust_email);
         $('#contact_no').val(localStorage.contact_no);
         $('#cust_bdate').val(localStorage.cust_bdate);
         $('#cust_photo').attr('src', localStorage.cust_photo);
     }
 });