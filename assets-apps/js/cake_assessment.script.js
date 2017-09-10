  $(document).ready(function() {
      var _txnMode;
      var oTable;
      var oSelectedRow;
      var parent_selected = '';

      var front_view_default_cake = ' <div class="layer5"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" id="l-item5" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item5" data-price="0" data-itemname=" "> </div></div><div class="layer4"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" id="l-item4" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item4" data-price="0" data-itemname=" "> </div></div><div class="layer3"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive " id="l-item3" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors " id="d-item3" data-price="0" data-itemname=" " > </div></div><div class="layer2"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive " id="l-item2" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item2" data-price="0" data-itemname=" "> </div></div><div class="layer1"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" id="l-item1" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item1" data-price="0" data-itemname=" "> </div></div>';
      var rear_view_default = ' <div class="layer5"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item10" data-price="0" data-itemname=" "> </div></div><div class="layer4"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors " id="d-item9" data-price="0" data-itemname=" "> </div></div><div class="layer3"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" data-price=0 data-itemname=""></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item8" data-price="0" data-itemname=" "> </div></div><div class="layer2"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item7" data-price="0" data-itemname=" "> </div></div><div class="layer1"> <div class="layer-box"><img src="../../assets-apps/img/basecake/base.png" class="img-responsive" data-price="0" data-itemname=" "></div><div class="decor-box"> <img src="" class="img-responsive decors" id="d-item6" data-price="0" data-itemname=" "> </div></div>';

      var tbl_default = ' <div class="row"> <div class="col-lg-6"> <table class="table table-responsive tbl-gen-info"> <tbody><tr> <td>Cake Name :</td><td colspan="2" id="c-cn"></td></tr><tr> <td>Cake Description :</td><td colspan="2" id="c-desc"></td></tr><tr> <td>Size &amp; Serving :</td><td id="c-size"></td><td id="c-size-p"></td></tr><tr> <td>General Flavor :</td><td id="c-flav"></td><td id="c-flav-p"></td></tr><tr> <td>Dedication Details :</td><td colspan="2" id="c-dedi"></td></tr><tr> <td>Estimated Price :</td><td colspan="2" id="c-eprice">0</td></tr><tr> <td>Actual Price :</td><td colspan="2" id="c-aprice"></td></tr><tr> <td>Estimated Pick up date :</td><td colspan="2" id="c-edate"></td></tr><tr> <td>Suggestion</td><td colspan="2" id="c-suggestion"></td></tr></tbody></table> </div><div class="col-lg-6"> <table class="table table-responsive tbl-front-rear"> <tbody><tr> <td colspan="3">Front View and Rear View Layer Style Details</td></tr><tr> <td>#</td><td>Name</td><td>Price</td></tr><tr class="tool-1"> <td>Layer 1</td><td id="c-l1"> </td><td id="c-p1">0</td></tr><tr class="tool-2"> <td>Layer 2</td><td id="c-l2"> </td><td id="c-p2">0</td></tr><tr class="tool-3"> <td>Layer 3</td><td id="c-l3"> </td><td id="c-p3">0</td></tr><tr class="tool-4"> <td>Layer 4</td><td id="c-l4"> </td><td id="c-p4">0</td></tr><tr class="tool-5"> <td>Layer 5</td><td id="c-l5"> </td><td id="c-p5">0</td></tr></tbody></table> </div></div><div class="row"> <div class="col-lg-6"> <table class="table table-responsive tbl-front"> <tbody><tr> <td colspan="3">Front View Decoration Details</td></tr><tr> <td>#</td><td>Name</td><td>Price</td></tr><tr class="tool-1"> <td>Layer 1</td><td id="c-fd1"> </td><td id="c-fdp1">0</td></tr><tr class="tool-2"> <td>Layer 2</td><td id="c-fd2"> </td><td id="c-fdp2">0</td></tr><tr class="tool-3"> <td>Layer 3</td><td id="c-fd3"> </td><td id="c-fdp3">0</td></tr><tr class="tool-4"> <td>Layer 4</td><td id="c-fd4"> </td><td id="c-fdp4">0</td></tr><tr class="tool-5"> <td>Layer 5</td><td id="c-fd5"> </td><td id="c-fdp5">0</td></tr><tr class="row-top"> <td colspan="3">Toppings</td></tr></tbody></table> </div><div class="col-lg-6"> <table class="table table-responsive tbl-rear"> <tbody><tr> <td colspan="3">Rear View Decoration Details</td></tr><tr> <td>#</td><td>Name</td><td>Price</td></tr><tr class="tool-1"> <td>Layer 1</td><td id="c-rd1"> </td><td id="c-rdp1">0</td></tr><tr class="tool-2"> <td>Layer 2</td><td id="c-rd2"> </td><td id="c-rdp2">0</td></tr><tr class="tool-3"> <td>Layer 3</td><td id="c-rd3"> </td><td id="c-rdp3">0</td></tr><tr class="tool-4"> <td>Layer 4</td><td id="c-rd4"> </td><td id="c-rdp4">0</td></tr><tr class="tool-5"> <td>Layer 5</td><td id="c-rd5"> </td><td id="c-rdp5">0</td></tr><tr class="row-top"> <td colspan="3">Toppings</td></tr></tbody></table> </div></div>';
      var flavor_price = 0;
      var size_price = 0;

      var estimated_price_new = 0;



      //*******************************************************************************************************************
      var initializeControls = function() {
          oTable = $('#list').DataTable({
              "dom": '<"toolbar">frtip',
              "bLengthChange": false,
              "ajax": http + "Cake_templates/ready_to_assess",
              "columns": [

                  {
                      targets: [1],
                      data: "cake_template_id"
                  },
                  {
                      targets: [2],
                      data: "cust_fullname"
                  },
                   {
                      targets: [3],
                      data: "cake_template_name"
                  },
                    {
                      targets: [4],
                      data: "estimated_picktup_date"
                  },
                  {
                      targets: [5],
                      data: "estimated_price"
                  },
                  {
                      targets: [6],
                      data: "actual_price"
                  },

                   {
                      targets: [7],
                      data: "status"
                  },

                  {
                      targets: [8],
                      render: function(data, type, full, meta) {
                          return '<center><a href="#" id="edit_info" class="btn btn-info"><i class="glyphicon glyphicon-pencil"></i></a> <a href="#" id="delete_info" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></a></center>';
                      }
                  }

              ]
          });

        




      }();
      //*******************************************************************************************************************



      var bindEventHandlers = function() {

          //new
          
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
                  "url": http + "Cake_templates/transaction/delete",
                  "data": [{
                      name: "cake_template_id",
                      value: c.cake_template_id
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

              $('.front_view').html(data.front_view);
              $('.rear_view').html(data.rear_view);
              $('#tbl_info_main').html(data.tbl_details);
              $('#modal_form').modal('show');

          });




      }();


      //save
      $('#btn_save_record').click(function() {
          var btn = $(this);
          var f = $('#frm_data');

          if (validateRequiredFields(f)) {

              var _data = f.serializeArray(); //serialize data in array format


                  var c = oTable.row(oSelectedRow).data();
                  _data.push({
                      name: "cake_template_id",
                      value: c.cake_template_id
                  });
                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Cake_templates/assess",
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
      });


     



  });