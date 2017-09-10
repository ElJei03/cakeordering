
    globalVcode : '',
    globalCustomerId : '',
    

        //Validation
        $('form').parsley();
  
                 //save
                 $('#btn_sign_up').click(function() {
                     var btn = $(this);
                     var f = $('#form_signup');
                     var sendSms = '';
                     
                     if ($('#remember').prop('checked')) {
                            sendSms = 'go';
                        }else{
                            sendSms = 'no';
                        }
                     
                     if (validateRequiredFields(f)) {
         
                         var _data = f.serializeArray(); //serialize data in array format
                             //save new card info
                             $.ajax({
                                 "dataType": "json",
                                 "type": "POST",
                                 "url": http+"Customers/transaction/create/"+sendSms,
                                 "data": _data,
                                 "beforeSend": function() {
                                     showSpinningProgress(btn);
                                 },
                                 beforeSend: function() {
                                 $('#loader-modal').addClass('loading');
                                },
                                 success: function (data) {
                                   console.log("data");
                                   console.log(data);
                                     globalVcode = data.vcode;
                                     globalCustomerId = data.customer_id;
                                     
                                     if(data.stat == 'success'){
                                          $("#verification_modal").click();
                                     }else{
                                     }
		                          },
                                 complete: function() {
                                     $('#loader-modal').removeClass('loading');
                                },
                                 error: function(xhr, status, error) {
                                     // check status && error
                                     console.log(xhr);
                                 }
                             }).done(function(response) {
                                showNotification(response);
                               // Main.showNotification({title:"Info!",stat:"success",msg:"Check your email for Verification Code"});
                             }).always(function() {
                                showSpinningProgress(btn);
                             });
         
                     }
                 });
        
              //save
                 $('#btn_modal_proceed').click(function() {
                  
                     var vcodeText = $('#vcode-text').val();
                     
                     if( == vcodeText){
                         

                         console.log("globalCustomerId");
                         console.log(globalCustomerId);
                         
                         //update is_active to 1

                       /*  $.ajax({
                              "dataType": "json",
                              "type": "POST",
                              "url": http + "Customers/transaction/delete",
                              "data": [{

                                  name: "customer_id",
                                  value: globalCustomerId
                              }]

                              }).done(function(response) {
                                 
                                 console.log("Delete Successfull");

                              });*/
                         showNotification({title:"SuccglobalVcodeess!",stat:"success",msg:"Register Complete"});
                         
                         $("#form-bp1").modal('hide');


                         
                     }else{
                          console.log("Dont Proceed");
                       showNotification({title:"Error!",stat:"error",msg:"Invalid Verification Code"});
                     }
                     
                 });
        
        
            
        
        

    
    

