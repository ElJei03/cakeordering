  $(document).ready(function() {
      loadCakes();
      var _txnMode, cake_id;




      //new
      $('#btn_new').click(function() {
          _txnMode = "new";

          var m = $('#modal_form');

          clearFields(m);
          m.modal('show');


      });





    //new
  






$('#btn_save').click(function() {
    var btn = $(this);
    var f = $('#frm_data');




    if (validateRequiredFields(f)) {

        var _data = f.serializeArray(); //serialize data in array format
 _data.push({name : "image_path" ,value : $('img[name="img_user"]').attr('src')});




console.log(_data);


        $.ajax({
            "dataType": "json",
            "type": "POST",
            "url": http + "Cake_Controller/transaction/create",
            "data": _data,
            "beforeSend": function() {
                //  showSpinningProgress(btn);
            },
            error: function(xhr, status, error) {
                // check status && error
                console.log(xhr);
            }
        }).done(function(response) {
            console.log(response)
            showNotification(response);
           
            if (response.stat == "success") {
              
            }

        }).always(function() {

        });


    }
});

























      //edit
      $(document).on('click', '[name="edit_info"]', function() {
          _txnMode = "edit";

          elem = $(this).closest('.func');
          cake_id = elem.data('cake-id');
          $('#modal_form').modal('show');
          createStructure();

      });


      //save




      $(document).on('click', '#delete_info', function() {

          _txnMode = "delete";
          cake_id = elem.data('cake-id');

          alert(cake_id);

          $('#modal_confirmation').modal('show');

      });




      //confirm delete
      $('#confirm_delete').click(function() {

          $('#modal_confirmation').modal('hide');

          $.ajax({
              "dataType": "json",
              "type": "POST",
              "url": http + "Cakes/transaction/delete",
              "data": [{
                  name: "cake_id",
                  value: cake_id
              }]
          }).done(function(response) {
              showNotification(response);
              if (response.stat == "success") {
                  oTable.row(oSelecteditem).remove().draw();
              }

          });
      });




  });

  function createStructure(value) {


      var tags =
          '<div class="col-lg-3">' +
          '<div class="item" >' +
          '<div class="cake-description">' +
          '<ul>' +
          '<li><span name="cake_name">' + value.cake_name + '</span></li>' +
          '<li>Price : <span name="price">' + value.price + '</span></li>' +
          '</ul>' +
          '<p><span name="cake_description">' + value.cake_description + '</span></p>' +
          '</div>' +
          '<div class="photo">' +
          '<div class="img">' +
          '<img src="' + value.image_path + '" class="img-responsive">' +
          '<div class="over">' +
          '<div class="func" data-cake-id="' + value.cake_id + '">' +
          '<a href="#" name="view_info"><i class="glyphicon glyphicon-search"></i></a>' +
          '<a href="#" name="edit_info"><i class="glyphicon glyphicon-pencil"></i></a>' +
          '<a href="#" name="delete_info"><i class="glyphicon glyphicon-trash"></i></a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';

      $('.gallery-container').append(tags);

  }

  function loadCakes() {



      $.ajax({
          dataType: "json",
          type: "POST",
          url: http + 'Cake_Controller/transaction/list', //call controller class/function to execute

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
          $('img[name="img_user"]').attr('src', 'assets/images/anonymous-icon.png');
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
              url: http + 'Cake_Controller/transaction/upload',
              type: "POST",
              data: data,
              cache: false,
              dataType: 'json',
              processData: false,
              contentType: false,
              success: function(response) {
                  //console.log(response);
                  alert(response.path);
                  $('#div_img_loader').hide();
                  $('#div_img_user').show();
                  $('img[name="img_user"]').attr('src', http + response.path);


                  console.log(http + response.path);
              }
          });

      });



  }