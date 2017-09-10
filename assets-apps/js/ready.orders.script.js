  $(document).ready(function() {


      var _txnMode;
      var oTable;
      var oSelectedRow;
      var user_account_id = localStorage.user_account_id;

      //initialize datepicker fields



      //*******************************************************************************************************************
      var initializeControls = function() {
          oTable = $('#list').DataTable({
              "dom": '<"toolbar">frtip',
              "bLengthChange": false,
              "ajax": http + "/Ready_Made_Orders/transaction/list",
              "columns": [

                  {
                      targets: [1],
                      data: "ready_cake_order_id"
                  },
                   {
                      targets: [2],
                      data: "cust_fullname"
                  },
                                     {
                      targets: [3],
                      data: "cust_email"
                  },
                                     {
                      targets: [4],
                      data: "contact_no"
                  },
                  {
                      targets: [5],
                      data: "cost"
                  },
                  {
                      targets: [6],
                      data: "estimated_pickedup"
                  },
                  {
                      targets: [7],
                      data: "order_status"
                  },



                  {
                      targets: [8],
                      render: function(data, type, full, meta) {
                        

                              //return '<center><a  href="#" id="view_info" class="btn btn-success" title="Process Order Details"><i class="glyphicon glyphicon-saved"></i></a> <a href="#" id="delete_info" class="btn btn-danger" title="Cancel Order"><i class="glyphicon glyphicon-remove"></i></a></center>';

                    return '<center><a  href="#" id="view_info" class="btn btn-success" title="Process Order Details"><i class="glyphicon glyphicon-saved"></i></a></center>';

                          
                      }
                  }

              ]
          });




      }();
      //*******************************************************************************************************************



      var bindEventHandlers = function() {


          //delete
          $('#list').on('click', '#delete_info', function() {
              oSelectedRow = $(this).closest('tr'); //selected row
              $('#modal_confirmation').modal('show');



          });



 //confirm delete
          $('#btn_update_record').click(function() {
            var c = oTable.row(oSelectedRow).data();
            var order_status  = $('#ds').val();
            var date_pickedup = $('#date_pickedup').val();

           
              $.ajax({
                  "dataType": "json",
                  "type": "POST",
                  "url": http + "Ready_Made_Orders/process_order",
                  "data": [{
                      name: "ready_cake_order_id",
                      value: c.ready_cake_order_id
                  },{
                      name: "order_status",
                      value: order_status
                     
                  },{
                      name: "date_pickedup",
                      value: date_pickedup
                     
                  },{
                      name: "customer_id",
                      value: c.customer_id
                     
                  }
                  ]
              }).done(function(response) {
                  showNotification(response);

                  if (response.stat == "success") {
                      oTable.row(oSelectedRow).data(response.row_updated[0]).draw();
                  }
                   $('#modal_form').modal('hide');
              });
          });






          //confirm delete
          $('#confirm_delete').click(function() {
              //alert("ENTER OVERRIDE HERE!!!!");
              $('#modal_confirmation').modal('hide');
              var c = oTable.row(oSelectedRow).data();

              $.ajax({
                  "dataType": "json",
                  "type": "POST",
                  "url": http + "Ready_Made_Orders/cancel_order",
                  "data": [{
                      name: "ready_cake_order_id",
                      value: c.ready_cake_order_id
                  },{
                      name: "order_status",
                      value: "cancel"
                     
                  }]
              }).done(function(response) {
                  showNotification(response);

                  if (response.stat == "success") {
                      oTable.row(oSelectedRow).data(response.row_updated[0]).draw();
                  }

              });
          });


          //edit
          $('#list').on('click', '#view_info', function() {
              _txnMode = "edit";
              oSelectedRow = $(this).closest('tr');
              var data = oTable.row(oSelectedRow).data();
              ;



              $('#cust_fullname').html(data.cust_fullname);
              $('#cust_email').html(data.cust_email);
              $('#contact_no').html(data.contact_no);
              $('#cost').html(data.cost);

              $('#image_path').attr('src',data.image_path);

              $('#estimated_pickedup').html(data.estimated_pickedup);
              $('#date_ordered').html(data.date_ordered);
              $('#date_pickedup').val(data.date_pickedup);
              $('#order_status').html(data.order_status);



              if(data.order_status=='paid' || data.order_status=='cancel' ){

                $('#process_t').hide();
                 $('#date_pickedup').prop("readonly",true);
                 $('#btn_update_record').hide();
              }else{
                $('#process_t').show();
                 $('#date_pickedup').prop("readonly",false);
                 $('#btn_update_record').show();
              }

              $('#modal_form').modal('show');

          });


     

      }();



      var findResponseToHTML = function(_parentHTML, response_row) {
          $('span,p,h1,h4,div,input', _parentHTML).each(function() {
              var _elem = $(this);
              $.each(response_row, function(name, value) {
                  if (_elem.attr('name') == name) {
                      _elem.html(value);
                  }
              });
          });

      }


  });