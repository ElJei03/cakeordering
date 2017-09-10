SignUpCustomer = {
    
    http : 'http://localhost:8012/cakeordering/backend/',
    globalVcode : '',
    
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
                                 "url": self.http+"Customers/transaction/create/"+sendSms,
                                 "data": _data,
                                 "beforeSend": function() {
                                     Main.showSpinningProgress(btn);
                                 },
                                 beforeSend: function() {
                                 $('#loader-modal').addClass('loading');
                                },
                                 success: function (data) {
                                     
                                     self.globalVcode = data.vcode;
                                     
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
                                 Main.showNotification(response);
                               // Main.showNotification({title:"Info!",stat:"success",msg:"Check your email for Verification Code"});
                             }).always(function() {
                                 Main.showSpinningProgress(btn);
                             });
         
                     }
                 });
        
              //save
                 $('#btn_modal_proceed').click(function() {
                  
                     console.log("Global");
                     console.log(self.globalVcode);
                     
                     var vcodeText = $('#vcode-text').val();
                      console.log(vcodeText);
                     
                     if(self.globalVcode == vcodeText){
                         console.log("Proceed");
                         Main.showNotification({title:"Success!",stat:"success",msg:"Register Complete"});
                         $("#form-bp1").modal('hide');
                         
                     }else{
                          console.log("Dont Proceed");
                         Main.showNotification({title:"Error!",stat:"error",msg:"Invalid Verification Code"});
                     }
                     
                 });
        
        
            
        
        
    },
    
    
    
    saveCustomerDetails : function(){
    
        
        
        
    },
    
    
    
    
    
    
}