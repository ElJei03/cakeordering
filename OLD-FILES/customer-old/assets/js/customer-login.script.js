LogIn = {
    
    ctrl_url : 'http://localhost:8012/cakeordering/backend/',
    
    init : function(){
        
        this.btnHandler();
        
    },
    
    /* Function for Btn*/
    btnHandler : function(){
        
        var self = this;
         
             $('#btn_login').click(function(){
                var btn=$(this);
                var f=$('#frm_login');
                 
                if(Main.validateRequiredFields(f)){
                    
                    console.log("Im Inside");
                    
                    var _data=f.serializeArray(); //serialize data in array format
  
                        console.log(_data);

                        $.ajax({
                            "dataType":"json",
                            "type":"POST",
                            "url":self.ctrl_url+"Customers/auth_cust",
                            "data":_data,
                            "beforeSend" : function(){
                               Main.showSpinningProgress(btn);
                            },error: function(xhr, status, error) {
                                // check status && error
                                console.log(xhr);
                                }
                        }).done(function(response){
                                console.log(response)
                                 Main.showNotification(response);
                        
                           
                            if(response.stat=="success"){
                                setTimeout(function(){
                                window.location.href = 'dashboard';
                            },600);
                            }

                        }).always(function(){
                          
                        });
                 

                }
            });
        
        
            $('#btn_register').click(function(){
                        
                console.log("Register");
                
                setTimeout(function(){
                    
                    window.location.href = 'sign-up';
                    
                 },600);
            });
        
    },
    
    /*Function for Token*/
    requiredToken : function(){
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
    },
    
}



        

