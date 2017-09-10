  $(document).ready(function() {
      var _txnMode;
      var oTable;
      var oSelectedRow;




      //*******************************************************************************************************************
      var initializeControls = function() {
          oTable = $('#list').DataTable({
              "dom": '<"toolbar">frtip',
              "bLengthChange": false,
              "ajax": http + "Customers/transaction/list",
              "columns": [

                  {
                      targets: [1],
                      data: "customer_id"
                  },
                  {
                      targets: [2],
                      data: "cust_fullname"
                  },
                  {
                      targets: [3],
                      data: "address"
                  },
                  {
                      targets: [4],
                      data: "cust_email"
                  },
                  {
                      targets: [5],
                      data: "contact_no"
                  },
                  {
                      targets: [6],
                      data: "cust_bdate"
                  },



                  {
                      targets: [7],
                      render: function(data, type, full, meta) {
                          return '<center><a href="#" id="edit_info" class="btn btn-info"><i class="glyphicon glyphicon-pencil"></i></a> <a href="#" id="delete_info" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></a></center>';
                      }
                  }

              ]
          });

          var createToolBarButton = function() {
              var _btnNew = '<button class="btn btn-info"  id="btn_new" data-toggle="modal" data-target="" data-placement="left" title="Register User Account" >' +
                  '<i class="glyph-icon icon-users"></i> <b>Register Customer Account</b></button>';
              $("div.toolbar").html(_btnNew);
          }();




      }();
      //*******************************************************************************************************************



      var bindEventHandlers = function() {

          //new
          $('#btn_new').click(function() {
              _txnMode = "new";
              var m = $('#modal_form');
              $('#span_note').hide();
              clearFields(m);
              m.modal('show');
              $('.date-picker').val("");
          });

          //delete
          $('#list').on('click', '#delete_info', function() {
              oSelectedRow = $(this).closest('tr'); //selected row
              $('#modal_confirmation').modal('show');

          });

          //confirm delete
          $('#confirm_delete').click(function() {
              //alert("ENTER OVERRIDE HERE!!!!");
              $('#modal_confirmation').modal('hide');
              var c = oTable.row(oSelectedRow).data();
              $.ajax({
                  "dataType": "json",
                  "type": "POST",
                  "url": http + "Customers/transaction/delete",
                  "data": [{
                      name: "customer_id",
                      value: c.customer_id
                  }]
              }).done(function(response) {
                  showNotification(response);
                  if (response.stat == "success") {
                      oTable.row(oSelectedRow).remove().draw();
                  }

              });
          });


          //edit
          $('#list').on('click', '#edit_info', function() {
              _txnMode = "edit";
              oSelectedRow = $(this).closest('tr');
              var data = oTable.row(oSelectedRow).data();
              var _parent = $('#modal_form');
              $('input,textarea', _parent).each(function() {
                  var _elem = $(this);
                  $.each(data, function(name, value) {
                      if (_elem.attr('name') == name) {
                          _elem.val(value);
                      }
                  });
              });

              $('#span_note').show();

              $('input[name="cust_pword"]').val("");
              $('#modal_form').modal('show');

          });


          //save
          $('#btn_save_record').click(function() {
              var btn = $(this);
              var f = $('#frm_data');

              if (validateRequiredFields(f)) {

                  var _data = f.serializeArray(); //serialize data in array format

                  console.log("YOw Here");
                  console.log(_data);


                  if (_txnMode == "new") {
                      //save new card info
                      $.ajax({
                          "dataType": "json",
                          "type": "POST",
                          "url": http + "Customers/transaction/create",
                          "data": _data,
                          "beforeSend": function() {
                              // showSpinningProgress(btn);
                          },
                          error: function(xhr, status, error) {
                              // check status && error
                              console.log(xhr);
                          }
                      }).done(function(response) {
                          showNotification(response);
                          if (response.stat == "success") {
                              //oTable.row(oSelectedRow).data(response.row_added[0]).draw();
                              oTable.row.add(response.row_added[0]).draw(); //add new data to user table
                              clearFields(f); //clear all form fields
                              $('.date-picker').val("");
                          }

                      }).always(function() {
                          //  showSpinningProgress(btn);
                      });
                  } else {

                      var c = oTable.row(oSelectedRow).data();
                      _data.push({
                          name: "customer_id",
                          value: c.customer_id
                      });
                      $.ajax({
                          "dataType": "json",
                          "type": "POST",
                          "url": http + "Customers/transaction/update",
                          "data": _data,
                          "beforeSend": function() {
                                  //showSpinningProgress(btn);
                              }

                              ,
                          error: function(xhr, status, error) {
                              // check status && error
                              console.log(xhr);
                          }

                      }).done(function(response) {
                          showNotification(response);
                          if (response.stat == "success") {
                              oTable.row(oSelectedRow).data(response.row_updated[0]).draw();
                              clearFields(f); //clear all form fields
                              $('#modal_form').modal('hide');
                          }

                      }).always(function() {
                          // showSpinningProgress(btn);
                      });
                  }


              }
          });

      }();




  });