Main = {
    
    init : function(){
    
        var self = this;
        /* Login Object */
        LogIn.init();
        
    },
    validateRequiredFields : function(f){
        var self = this;
        var stat=true;
       
        $('div.input-group').removeClass('parsley-error');
        $('input[required],textarea[required],select[required]',f).each(function(){

            if($(this).is('select')){
                if($(this).select2('val')==0||$(this).select2('val')==null){
                    self.showNotification({title:"Error!",stat:"error",msg:$(this).data('error-msg')});
                    $(this).closest('div.input-group').addClass('parsley-error');
                    $(this).focus();
                    stat=false;
                    return false;
                }
            }else{
                if($(this).val()==""){
                    self.showNotification({title:"Error!",stat:"error",msg:$(this).data('error-msg')});
                    $(this).closest('div.input-group').addClass('parsley-error');
                    $(this).focus();
                    stat=false;
                    return false;
                }
            }

        });

        return stat;
    
    },
    
    
    clearFields : function(f){
      
        $('input,textarea',f).val('');
        $(f).find('input:first').focus();
        $('.date-picker').val("");
    },
    
    showNotification : function(obj){
        
        PNotify.removeAll(); //remove all notifications
            new PNotify({
                title:  obj.title,
                text:  obj.msg,
                type:  obj.stat
            });
    
    },
        
    showSpinningProgress : function(e){
         $(e).find('span').toggleClass('glyphicon glyphicon-refresh spinning');
    },


}

    
