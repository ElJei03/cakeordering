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

      load_serving_list();
      load_flavor_list();
      load_cake_list();
      load_decaration_list();

      load_topping_list();
      //$('.layer1 img,.layer2 img,.layer3 img,.layer4 img,.layer5 img').hide()


      //*******************************************************************************************************************
      var initializeControls = function() {
          oTable = $('#list').DataTable({
              "dom": '<"toolbar">frtip',
              "bLengthChange": false,
              "ajax": http + "Cake_templates/transaction/list",
              "columns": [

                  {
                      targets: [1],
                      data: "cake_template_id"
                  },
                  {
                      targets: [2],
                      data: "cake_template_name"
                  },
                  {
                      targets: [3],
                      data: "estimated_price"
                  },
                  {
                      targets: [4],
                      data: "actual_price"
                  },

                   {
                      targets: [5],
                      data: "status"
                  },

                  {
                      targets: [6],
                      render: function(data, type, full, meta) {
                          return '<center><a href="#" id="edit_info" class="btn btn-info"><i class="glyphicon glyphicon-pencil"></i></a> <a href="#" id="delete_info" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></a></center>';
                      }
                  }

              ]
          });

          var createToolBarButton = function() {
              var _btnNew = '<button class="btn btn-info"  id="btn_new" data-toggle="modal" data-target="" data-placement="left" title="Create Cake Templates" >' +
                  '<i class="glyphicon glyphicon-plus"></i> <b>Create Cake Templates</b></button>';
              $("div.toolbar").html(_btnNew);
          }();




      }();
      //*******************************************************************************************************************



      var bindEventHandlers = function() {

          //new
          $('#btn_new').click(function() {
              _txnMode = "new";
              var m = $('#modal_form');

              clearFields(m);
              $('.front_view').html(front_view_default_cake);
              $('.rear_view').html(rear_view_default);
              $('#modal_form').modal('show');
              $('.date-picker').val("");

              $('#tbl_info_main').html(tbl_default);
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


      $('#select_tops').on('change', function(e) {
          var optionSelected = $("option:selected", this);
          var valueSelected = this.value;

          if (valueSelected == 1) {
              $('#topping-container').html('');
              load_topping_list();

          } else if (valueSelected == 2) {
              $('#topping-container').html('');
              load_user_graphics_list();
          } else {

          }

          compute();

      });

      $('#serving_details').on('change', function(e) {
          var optionSelected = $("option:selected", this);
          var valueSelected = this.value;
          var no_layer = optionSelected.data('layers');

          if (no_layer == 1) {

              $('.layer2 img,.layer3 img,.layer4 img,.layer5 img').data('price', 0);

              $('.layer2 img,.layer3 img,.layer4 img,.layer5 img').hide();

              $('.layer1 img').show()


              $('.tool-2,.tool-3,.tool-4,.tool-5').hide();
              $('.tool-1').show()
          } else if (no_layer == 2) {

              ('.layer3 img,.layer4 img,.layer5 img').data('price', 0);
              $('.layer3 img,.layer4 img,.layer5 img').hide();
              $('.layer1 img,.layer2 img').show();


              $('.tool-3,.tool-4,.tool-5').hide();
              $('.tool-1,.tool-2').show();

          } else if (no_layer == 3) {
              $('.layer4 img,.layer5 img').data('price', 0);
              $('.layer4 img,.layer5 img').hide();
              $('.layer1 img,.layer2 img,.layer3 img').show();

              $('.tool-4,.tool-5').hide();
              $('.tool-1,.tool-2,.tool-3').show();
          } else if (no_layer == 4) {
              $('.layer5 img').data('price', 0);
              $('.layer5 img').hide();
              $('.layer1 img,.layer2 img,.layer3 img,.layer4 img').show();

              $('.tool-5').hide();
              $('.tool-1,.tool-2,.tool-3,.tool-4').show();
          } else if (no_layer == 5) {

              $('.layer1 img,.layer2 img,.layer3 img,.layer4 img,.layer5 img').show();
              $('.tool-1,.tool-2,.tool-3,.tool-4,.tool-5').show();

          } else {

              $('.layer1 img,.layer2 img,.layer3 img,.layer4 img,.layer5 img').hide();
              $('.tool-1,.tool-2,.tool-3,.tool-4,.tool-5').hide()

          }
          size_price = parseInt(optionSelected.data('price'));

          $('#c-size').html(valueSelected);
          $('#c-size-p').html(size_price);


          compute();

      });

      $('#flavor_details').on('change', function(e) {
          var optionSelected = $("option:selected", this);
          var valueSelected = this.value;
          flavor_price = parseInt(optionSelected.data('price'));
          $('#c-flav').html(valueSelected);
          $('#c-flav-p').html(flavor_price);


          compute();
      });

      var servingStructure = function(obj) {

          var tags = "<option data-price=" + obj.price + " data-layers=" + obj.layers + ">" + obj.layers + " - Layer | Size :  " + obj.size + " | " + obj.serving_description + "</option";

          $('#serving_details').prepend(tags);
      }




      var flavorStructure = function(obj) {

          var tags = "<option value=" + obj.flavor_name + " data-price=" + obj.price + ">" + obj.flavor_name + "</option";

          $('#flavor_details').append(tags);
      }



      function layerStructure(value) {
          var tags = "<div class='col-lg-6 box'><div class='cake-box'><div class='thumb-img-box'><a class='cake-thumbs' title='" + value.cake_description + "'><img  src='" + value.image_path + "'  class='img-responsive' data-price=" + value.price + " data-itemname='" + value.cake_name + "'></a></div><div class='details'><h5> " + value.cake_name + "</h5><h6> " + value.price + "</h6></div></div></div>";
          $('#layer-container').append(tags);

      }



      function decorStructure(value) {
          var tags = "<div class='col-lg-6 box'><div class='decor-holder'><div class='thumb-img-box'><a class='decor-thumbs' title='" + value.side_decoration_description + "'><img  src='" + value.image_path + "'  class='img-responsive' data-price=" + value.price + " data-itemname='" + value.side_decoration_name + "'></a></div><div class='details'><h5> " + value.side_decoration_name + "</h5><h6> " + value.price + "</h6></div></div></div>";
          $('#decor-container').append(tags);

      }

      function topStructure(value) {
          var tags = "<div class='col-lg-6 box'><div class='topping-box'><div class='thumb-img-box'><a class='topping-thumbs' title='" + value.topping_description + "'><img  src='" + value.image_path + "'  class='img-responsive' data-price=" + value.price + " data-itemname='" + value.topping_name + "'></a></div><div class='details'><h5> " + value.topping_name + "</h5><h6> " + value.price + "</h6></div></div></div>";
          $('#topping-container').append(tags);

      }



      function usergrap_Structure(value) {
          var tags = "<div class='col-lg-6 box'><div class='topping-box'><div class='thumb-img-box'><a class='topping-thumbs' title='" + value.graphic_description + "'><img  src='" + value.image_path + "'  class='img-responsive' data-price=" + 0 + " data-itemname='" + value.graphic_name + "'></a></div><div class='details'><h5> " + value.graphic_name + "</h5><h6> " + value.price + "</h6></div></div></div>";
          $('#topping-container').append(tags);

      }




      function load_serving_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Servings/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      servingStructure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }




      function load_flavor_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Flavors/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      flavorStructure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }




      function load_cake_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Cake/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      layerStructure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }



      function load_decaration_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Side_decorations/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      decorStructure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }



      function load_topping_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Toppings/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      topStructure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }



      function load_user_graphics_list() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'User_graphics/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      usergrap_Structure(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }




      $('.remove-top-front').click(function() {
          $('.front_view .dg').remove();
      })


      $('.remove-top-rear').click(function() {
          $('.rear_view .dg').remove();
      })


      $('.fview-selector').click(function() {
          parent_selected = ".front_view";
          $('.rview-selector').removeClass('btn-selected')
          $(this).addClass('btn-selected');

      });


      $('.rview-selector').click(function() {
          parent_selected = ".rear_view";
          $('.fview-selector').removeClass('btn-selected')

          $(this).addClass('btn-selected');

      });




      $('.layer1-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer1').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });



      $('.layer2-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer2').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.layer3-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer3').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.layer3-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer3').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.layer4-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer4').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.layer5-selector').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.layer5').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });


      $('.fvs-layer-1').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.front_view  .layer1').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });

      $('.fvs-layer-2').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');;
          $('.front_view  .layer2').addClass('selected');



          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');
      });




      $('.fvs-layer-3').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.front_view  .layer3').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.fvs-layer-4').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.front_view  .layer4').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });


      $('.fvs-layer-5').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.front_view  .layer5').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.rvs-layer-1').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.rear_view  .layer1').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });




      $('.rvs-layer-2').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.rear_view  .layer2').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });


      $('.rvs-layer-3').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.rear_view  .layer3').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });



      $('.rvs-layer-4').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.rear_view  .layer4').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });


      $('.rvs-layer-5').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');
          $('.rear_view  .layer5').addClass('selected');
          $('.btn').removeClass('btn-selected');
          $(this).addClass('btn-selected');

      });



      $('.clear').click(function() {

          $('.layer1, .layer2,.layer3,.layer4, .layer5').removeClass('selected');

          $('.btn').removeClass('btn-selected');
          parent_selected = '';
      });




      //save
      $('#btn_save_record').click(function() {
          var btn = $(this);
          var f = $('#frm_data');

          if (validateRequiredFields(f)) {

              var _data = f.serializeArray(); //serialize data in array format




              _data.push({
                  name: "customer_id",
                  value: localStorage.customer_id
              });


              _data.push({
                  name: "front_view",
                  value: $('.front_view').html()
              });

              _data.push({
                  name: "rear_view",
                  value: $('.rear_view').html()
              });

              _data.push({
                  name: "serving_details",
                  value: $('#serving_details option:selected').val()
              });
              _data.push({
                  name: "tbl_details",
                  value: $('#tbl_info_main').html()
              });

              _data.push({
                  name: "estimated_price",
                  value: estimated_price_new
              });



              if (_txnMode == "new") {
                  //save new card info
                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Cake_templates/transaction/create",
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
                          //oTable.row(oSelectedRow).data(response.row_add_cakeed[0]).draw();
                          oTable.row.add(response.row_added[0]).draw(); //add new data to user table
                          clearFields(f); //clear all form fields
                          $('.date-picker').val("");
                          $('.front_view').html(front_view_default_cake);
                          $('.rear_view').html(rear_view_default);
                          $('#tbl_info_main').html(tbl_default);
                          $('.clear').click();

                      }

                  }).always(function() {
                      //  showSpinningProgress(btn);
                  });
              } else {

                  var c = oTable.row(oSelectedRow).data();
                  _data.push({
                      name: "cake_template_id",
                      value: c.cake_template_id
                  });
                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Cake_templates/transaction/update",
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


      $(document).on('click', '.cake-thumbs', function() {


          var element = $(this).find('img');
          var img = element.attr('src');
          var price = element.attr('data-price');
          var name = element.attr('data-itemname');



          $('.selected .layer-box img').attr('src', img);
          $('.selected  .layer-box   img').data('price', price);
          $('.selected .layer-box  img').data('itemname', name);
          checkifSelectedExist();
          compute();

      });




      $(document).on('click', '.decor-thumbs', function() {



          var element = $(this).find('img');
          var img = element.attr('src');
          var price = element.attr('data-price');
          var name = element.attr('data-itemname');



          $('.selected .decor-box img').attr('src', img);
          $('.selected  .decor-box  img').data('price', price);
          $('.selected  .decor-box img').data('itemname', name);
          checkifSelectedExist();



          compute();
      });




      $(document).on('click', '.topping-thumbs', function() {
          checkifSelectedExist();

          var element = $(this).find('img');
          var img = element.attr('src');
          var price = element.attr('data-price');
          var name = element.attr('data-itemname');
          var clone = "<a class='dg' style='position:absolution;z-index:999'><img  height='50px' src=" + img + " class='get-price' data-price=" + price + " data-itemname='" + name + "'></a>";


          $(parent_selected).prepend(clone);
          $(".dg").draggable().css("position", "absolute");


          compute();
      });


      $('[data-toggle="tab"]').click(function() {

          $('.clear').click();

          compute();

      });

      $('[href="#step5"]').click(function() {
          $('[href="#tab3-2"]').click();
      });
      $('#cake_template_name').on('input', function(e) {
          var x = $(this).val();

          $('#c-cn').text(x);
      });


      $('#estimated_picktup_date').on('change', function(e) {
          var x = $(this).val();

          $('#c-edate').text(x);
      });

      $('#dedication_details').on('input', function(e) {
          var x = $(this).val();

          $('#c-dedi').text(x);
      });



      $('#cake_template_description').on('input', function(e) {
          var x = $(this).val();

          $('#c-desc').text(x);
      });


      $('#suggestion_box').on('input', function(e) {
          var x = $(this).val();

          $('#c-suggestion').text(x);
      });

      function compute() {




          var lp1 = parseInt($('#l-item1').data('price'));
          var lp2 = parseInt($('#l-item2').data('price'));
          var lp3 = parseInt($('#l-item3').data('price'));
          var lp4 = parseInt($('#l-item4').data('price'));
          var lp5 = parseInt($('#l-item5').data('price'));


          var ln1 = $('#l-item1').data('itemname');
          var ln2 = $('#l-item2').data('itemname');
          var ln3 = $('#l-item3').data('itemname');
          var ln4 = $('#l-item4').data('itemname');
          var ln5 = $('#l-item5').data('itemname');

          $("#c-p1").html(lp1);
          $("#c-p2").html(lp2);
          $("#c-p3").html(lp3);
          $("#c-p4").html(lp4);
          $("#c-p5").html(lp5);




          $("#c-l1").html(ln1);
          $("#c-l2").html(ln2);
          $("#c-l3").html(ln3);
          $("#c-l4").html(ln4);
          $("#c-l5").html(ln5);




          var fdp1 = parseInt($('#d-item1').data('price'));
          var fdp2 = parseInt($('#d-item2').data('price'));
          var fdp3 = parseInt($('#d-item3').data('price'));
          var fdp4 = parseInt($('#d-item4').data('price'));
          var fdp5 = parseInt($('#d-item5').data('price'));
          var rdp6 = parseInt($('#d-item6').data('price'));
          var rdp7 = parseInt($('#d-item7').data('price'));
          var rdp8 = parseInt($('#d-item8').data('price'));
          var rdp9 = parseInt($('#d-item9').data('price'));
          var rdp10 = parseInt($('#d-item10').data('price'));



          $("#c-fdp1").html(fdp1);
          $("#c-fdp2").html(fdp2);
          $("#c-fdp3").html(fdp3);
          $("#c-fdp4").html(fdp4);
          $("#c-fdp5").html(fdp5);
          $("#c-rdp1").html(rdp6);
          $("#c-rdp2").html(rdp7);
          $("#c-rdp3").html(rdp8);
          $("#c-rdp4").html(rdp9);
          $("#c-rdp5").html(rdp10);




          var fd1 = $('#d-item1').data('itemname');
          var fd2 = $('#d-item2').data('itemname');
          var fd3 = $('#d-item3').data('itemname');
          var fd4 = $('#d-item4').data('itemname');
          var fd5 = $('#d-item5').data('itemname');
          var rd6 = $('#d-item6').data('itemname');
          var rd7 = $('#d-item7').data('itemname');
          var rd8 = $('#d-item8').data('itemname');
          var rd9 = $('#d-item9').data('itemname');
          var rd10 = $('#d-item10').data('itemname');



          $("#c-fd1").html(fd1);
          $("#c-fd2").html(fd2);
          $("#c-fd3").html(fd3);
          $("#c-fd4").html(fd4);
          $("#c-fd5").html(fd5);
          $("#c-rd1").html(rd6);
          $("#c-rd2").html(rd7);
          $("#c-rd3").html(rd8);
          $("#c-rd4").html(rd9);
          $("#c-rd5").html(rd10);



          var totallayer = lp1 + lp2 + lp3 + lp4 + lp5;
          var totaldecor = fdp1 + fdp2 + fdp3 + fdp4 + fdp5 + rdp6 + rdp7 + rdp8 + rdp9 + rdp10;

          var totaprice = totallayer + totaldecor;

          var topping_price = 0;
          var topping_uprice = 0;
          var itemname = '';

          $('.d-row').remove();
          $(".front_view .get-price").each(function(index) {
              topping_uprice = parseInt($(this).data('price'));
              topping_price += topping_uprice;
              itemname = $(this).data('itemname');
              var tags = "<tr class='d-row'><td></td><td >" + itemname + "</td><td>" + topping_uprice + "</td></tr>";
              $('.tbl-front').append(tags);


          });

          $(".rear_view .get-price").each(function(index) {
              topping_uprice = parseInt($(this).data('price'));
              topping_price += topping_uprice;
              itemname = $(this).data('itemname');
              var tags = "<tr class='d-row'><td></td><td '>" + itemname + "</td><td>" + topping_uprice + "</td></tr>";
              $('.tbl-rear').append(tags);


          });

          var t;

          estimated_price_new = (totaldecor + totallayer + topping_price + flavor_price + size_price);

          console.log(t);
          $('#c-eprice').text(estimated_price_new);
      }



      function checkifSelectedExist() {
          if ($('.btn-selected').length == 0) {

              PNotify.removeAll(); //remove all notifications
              new PNotify({
                  title: 'Error',
                  text: 'Please select a layer',
                  type: 'error'
              });
          }
      }



  });