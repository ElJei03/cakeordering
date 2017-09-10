  $(document).ready(function() {


      loadCakes();


      $(document).on('click', '.thumb-cake', function() {

          var img = $(this).attr('src');

          var price = $(this).data('price');
          var ready_cake_name = $(this).data('ready-cake-name');
          var ready_cake_id = $(this).data('ready-cake-id');
          var ready_cake_description = $(this).data('ready-cake-description');

          $(".thumb-cake-txn").attr('src', img);

          $("#c-cake_name").html(ready_cake_name);
          $("#c-cake_description").html(ready_cake_description);
          $("#c-price").html(price);
          $("#cake-id").val(ready_cake_id);

      });




      function createStructureTop(value) {
          var tags = "<div class='col-sm-3 cake-layer-box'><a><img data-ready-cake-id='" + value.ready_cake_id + "' data-price='" + value.price + "' data-ready-cake-name='" + value.ready_cake_name + "' data-ready-cake-description='" + value.ready_cake_description + "' class='thumb-cake img-responsive' src='" + value.image_path + "' alt='Image' class='img-responsive'></a><h5> " + value.ready_cake_name + "</h5><h6> " + value.price + "</h6></div>";
          $('#item-container1').append(tags);

      }




      function loadCakes() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Ready_cakes/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      createStructureTop(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }




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
                  name: "ready_cake_id",
                  value: $("#cake-id").val()
              });


              _data.push({
                  name: "cost",
                  value: $("#c-price").html()
              });



              $.ajax({
                  "dataType": "json",
                  "type": "POST",
                  "url": http + "Ready_Made_Orders/transaction/create",
                  "data": _data,
                  "beforeSend": function() {

                      }

                      ,
                  error: function(xhr, status, error) {
                      // check status && error
                      console.log(xhr);
                  }


              }).done(function(response) {
                  showNotification(response);




                  if (response.stat == "success") {

                      setTimeout(function() {
                          window.location.href = '../track_ready_orders';
                      }, 1000);

                  }
              }).always(function() {

              });




          }




      });




  });