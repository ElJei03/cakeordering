SignUpCustomer = {
    
    globalVcode : '',
    globalCustomerId: '',
    
    init : function(){
        
        var self = this;
        //Validation
        $('form').parsley();
        
        /*Sign Up Customer*/
        self.btnHandlers();
            
        
        
    },
    
    
    btnHandlers : function(){
        
        var self = this;
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
                     
                     
                     if (Main.validateRequiredFields(f)) {
         
                         var _data = f.serializeArray(); //serialize data in array format
                             //save new card info
                             $.ajax({
                                 "dataType": "json",
                                 "type": "POST",
                                 "url": http+"Customers/transaction/signup/"+sendSms,
                                 "data": _data,
                                 "beforeSend": function() {
                                     Main.showSpinningProgress(btn);
                                 },
                                 beforeSend: function() {
                                 $('#loader-modal').addClass('loading');
                                },
                                 success: function (data) {
                                     
                                     self.globalVcode = data.vcode;
                                     self.globalCustomerId = data.cid;
                                     
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
                                 }
                             }).done(function(response) {
                                // Main.showNotification(response);
                               // Main.showNotification({title:"Info!",stat:"success",msg:"Check your email for Verification Code"});
                             }).always(function() {
                                 Main.showSpinningProgress(btn);
                             });
         
                     }
                 });
        
              //save
                 $('#btn_modal_proceed').click(function() {
                     var vcodeText = $('#vcode-text').val();
                    
                     if(self.globalVcode == vcodeText){
                        //update is_active
                           $.ajax({
                              "dataType": "json",
                              "type": "POST",
                              "url": http + "Customers/transaction/update-isactive",
                              "data": [{

                                  name: "customer_id",
                                  value: self.globalCustomerId
                              }]

                              }).done(function(response) {
                              });

                         Main.showNotification({title:"Success!",stat:"success",msg:"Register Complete"});
                         $('#cust_fname').val('');
                         $('#cust_lname').val('');
                         $('#cust_email').val('');
                         $('#contact_no').val('');
                         $('#cust_uname').val('');
                         $('#cust_uname').val('');
                         $('#cust_pword').val('');
                         $('#cust_cpword').val('');
                         $("#form-bp1").modal('hide');
                         
                     }else{
                         Main.showNotification({title:"Error!",stat:"error",msg:"Invalid Verification Code"});
                     }
                     
                 });
    },
    
    saveCustomerDetails : function(){
    },
    
}