  $(document).ready(function() {
      loadItem();
      var _txnMode, cake_id, oSelecteditem;




      //new
      $('#btn_new').click(function() {
          _txnMode = "new";

          var m = $('#modal_form');

          clearFields(m);
           $('#image_path').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
          $('#top_view').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
          m.modal('show');


      });




      //edit
      $(document).on('click', '[name="edit_info"]', function() {
          _txnMode = "edit";
          oSelecteditem = $(this).closest('.item');
          cake_id = oSelecteditem.find('[name="cake_id"]').val();
          image_path = oSelecteditem.find('[name="image_path"]').attr('src');
           top_view = oSelecteditem.find('[name="top_view"]').val();
          $('#image_path').attr('src', image_path);
          $('#top_view').attr('src', top_view);
          frm_data = $('#frm_data');
          findHTMLToVal(oSelecteditem, frm_data);
          $('#modal_form').modal('show');




      });


      //delete




      $(document).on('click', '[name="delete_info"]', function() {

          _txnMode = "delete";
          oSelecteditem = $(this).closest('.item');
          cake_id = oSelecteditem.find('[name="cake_id"]').val();

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


               _data.push({
                  name: "top_view",
                  value: $('#top_view').attr('src')
              });



              console.log(_data);



              if (_txnMode == "new") {
                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Cake_5/transaction/create",
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
                          $('#image_path').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
          $('#top_view').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
                          createStructure(response.row_added[0]);
                          console.log(response);
                      }

                  }).always(function() {

                  });
              } else {

                  _data.push({
                      name: "cake_id",
                      value: cake_id
                  });



                  $.ajax({
                      "dataType": "json",
                      "type": "POST",
                      "url": http + "Cake_5/transaction/update",
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

                          oSelecteditem.find('[name="image_path"]').attr('src', response.row_updated[0].image_path);
                          oSelecteditem.find('[name="top_view"]').val(response.row_updated[0].top_view);
                          findResponseToHTML(oSelecteditem, response.row_updated[0]);
                           $('#image_path').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
           $('#top_view').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
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
              "url": http + "Cake_5/transaction/delete",
              "data": [{
                  name: "cake_id",
                  value: cake_id
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
          '<div class="thumbnail thumbnail-2">' +
          '<input type="hidden" name="cake_id" value="' + value.cake_id + '" />' +
          '<img class="group list-group-image img-thumbnail" name="image_path"  title="'+ value.cake_description +'"  src="' + value.image_path + '" alt="">' +
           '<input type="hidden" name="top_view" value="' + value.top_view + '" />' +
          '<div class="caption" style="border: solid #ec4444 1px;"  >' +
          '<h4 class="group inner list-group-item-heading" name="cake_name">' + value.cake_name + '</h4>' +
         
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
          url: http + 'Cake_5/transaction/list', //call controller class/function to execute

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

}


      $('#btn_browse').click(function(event) {
          event.preventDefault();
          $('input[name="file_upload[]"]').click();
      });


      $('#btn_remove_photo').click(function(event) {
          event.preventDefault();
            $('#image_path').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
         
      });



      $('#btn_browse2').click(function(event) {
          event.preventDefault();
          $('input[name="file_upload2[]"]').click();
      });


      $('#btn_remove_photo2').click(function(event) {
          event.preventDefault();
          
          $('#top_view').attr('src', '../../assets-apps/img/dummy/image-upload-placeholder.jpg');
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
              url: http + 'Cake_5/transaction/upload',
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



       $('input[name="file_upload2[]"]').change(function(event) {
          var _files = event.target.files;

          $('#div_img_user2').hide();
          $('#div_img_loader2').show();


          var data = new FormData();
          $.each(_files, function(key, value) {
              data.append(key, value);
          });


          $.ajax({
              url: http + 'Cake_5/transaction/upload',
              type: "POST",
              data: data,
              cache: false,
              dataType: 'json',
              processData: false,
              contentType: false,
              success: function(response) {
                  //console.log(response);

                  $('#div_img_loader2').hide();
                  $('#div_img_user2').show();
                  $('#top_view').attr('src', http + response.path);


                  console.log(http + response.path);
              }
          });

      });









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