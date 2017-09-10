  $(document).ready(function() {
      loadItem();
      var _txnMode, topping_id, oSelecteditem;




      //new
      $('#btn_new').click(function() {
          _txnMode = "new";

          var m = $('#modal_form');

          clearFields(m);
          $('#image_path').attr('src', '')
          m.modal('show');


      });




      //edit
      $(document).on('click', '[name="edit_info"]', function() {
          _txnMode = "edit";
          oSelecteditem = $(this).closest('.item');
          topping_id = oSelecteditem.find('[name="topping_id"]').val();
          image_path = oSelecteditem.find('[name="image_path"]').attr('src');
          $('#image_path').attr('src', image_path)
          frm_data = $('#frm_data');
          findHTMLToVal(oSelecteditem, frm_data);
          $('#modal_form').modal('show');




      });


      //delete




      $(document).on('click', '[name="delete_info"]', function() {

          _txnMode = "delete";
          oSelecteditem = $(this).closest('.item');
          topping_id = oSelecteditem.find('[name="topping_id"]').val();

          $('#modal_confirmation').modal('show');

      });




      //save and update

      $('#btn_save').click(function() {
          var btn = $(this);
          var f = $('#frm_data');




          if (validateRequiredFields(f)) {

              var _data = f.serializeArray(); //serialize data in array format
              _data.push({
                  name: "image_path",
                  value: $('#image_path').attr('src')
              });




              console.log(_data);



              if (_txnMode == "new") {
                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Toppings/transaction/create",
                      "data": _data,
                      "beforeSend": function() {

                      },
                      error: function(xhr, status, error) {

                          console.log(xhr);
                      }
                  }).done(function(response) {
                      console.log(response)
                      showNotification(response);

                      if (response.stat == "success") {
                          clearFields(f);
                          $('#image_path').attr('src', '')
                          createStructure(response.row_added[0]);
                          console.log(response);
                      }

                  }).always(function() {

                  });
              } else {

                  _data.push({
                      name: "topping_id",
                      value: topping_id
                  });

                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Toppings/transaction/update",
                      "data": _data,
                      "beforeSend": function() {

                      },
                      error: function(xhr, status, error) {

                          console.log(xhr);
                      }
                  }).done(function(response) {
                      console.log(response)
                      showNotification(response);

                      if (response.stat == "success") {

                          oSelecteditem.find('[name="image_path"]').attr('src', response.row_updated[0].image_path)
                          findResponseToHTML(oSelecteditem, response.row_updated[0]);
                          $('#image_path').attr('src', '')

                          clearFields(f);
                          $('#modal_form').modal('hide');


                      }

                  }).always(function() {

                  });



              }




          }
      });




      //confirm delete
      $('#confirm_delete').click(function() {

          $('#modal_confirmation').modal('hide');

          $.ajax({
              "dataType": "json",
              "type": "POST",
              "url": http + "Toppings/transaction/delete",
              "data": [{
                  name: "topping_id",
                  value: topping_id
              }]
          }).done(function(response) {
              showNotification(response);
              if (response.stat == "success") {
                  oSelecteditem.remove();
              }

          });
      });




  });

  function createStructure(value) {
      var tags =
          '<div  class="item  col-xs-12 col-lg-2">' +
          '<div class="thumbnail thumbnail-1">' +
          '<input type="hidden" name="topping_id" value="' + value.topping_id + '" />' +
          '<img class="group list-group-image img-thumbnail" name="image_path" src="' + value.image_path + '" alt="">' +
          '<div class="caption" style="border: solid #ec4444 1px;"  >' +
          '<h4 class="group inner list-group-item-heading" name="topping_name">' + value.topping_name + '</h4>' +
          '<p class="group inner list-group-item-text" name="topping_description">' + value.topping_description +
          '<div class="row">' +
          '<div class="col-xs-12 col-md-12">' +
          '<p  > PHP.<span name="price">' + value.price + '</span></p>' +
          '</div>' +

          '</div>' +
          '</div>' +

          '</div>' +
          '<div class="row">' +
          '<div class="col-xs-12 col-md-12 hidden-data text-center">' +
          '<a href="#" name="edit_info" class="btn btn-info"><i class="glyphicon glyphicon-pencil"></i></a>' +
          '<a href="#" name="delete_info" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>';

      $('#item-container').append(tags);

  }

  function loadItem() {



      $.ajax({
          dataType: "json",
          type: "POST",
          url: http + 'Toppings/transaction/list', //call controller class/function to execute

          success: function(response) {

              console.log(response.data);


              $.each(response.data, function(index, value) {

                  createStructure(value);


              });

          },
          error: function(xhr, status, error) {
              // check status && error
              console.log(xhr);
          }
      });




      $('#btn_browse').click(function(event) {
          event.preventDefault();
          $('input[name="file_upload[]"]').click();
      });


      $('#btn_remove_photo').click(function(event) {
          event.preventDefault();
          $('#image_path').attr('src', '../assets/img/loader/ajax-loader-sm.gif');
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
              url: http + 'Toppings/transaction/upload',
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
                  $('#image_path').attr('src', http + response.path);


                  console.log(http + response.path);
              }
          });

      });



  }




  var findValToHTML = function(_parentHTML, _parentForm) {
      $('span,p,h1', _parentHTML).each(function() {
          var childinnerHTML = $(this);
          $('select,input,textarea', _parentForm).each(function() {
              var childInputVal = $(this);
              if (childinnerHTML.attr('name') == childInputVal.attr('name')) {
                  childinnerHTML.html(childInputVal.val());
              }
          });
      });
  }


  var findHTMLToVal = function(_parentHTML, _parentForm) {
      $('span,p,h1,h4,div', _parentHTML).each(function() {
          var childinnerHTML = $(this);
          $('select,input,textarea', _parentForm).each(function() {
              var childInputVal = $(this);
              if (childinnerHTML.attr('name') == childInputVal.attr('name')) {
                  childInputVal.val(childinnerHTML.html());
              }
          });
      });
  }



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