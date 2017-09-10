  $(document).ready(function() {
      var layer_id = 1; var layer_id2 = 0;
      var price = 0,
          step_total_price = 0;

      var layer_count = 0;

loadToppings();

      $(document).on('click', '.thumb-layer-1,.thumb-layer-2,.thumb-layer-3,.thumb-layer-4,.thumb-layer-5', function() {

          var img = $(this).attr('src');

          price = $(this).data('price');
          $("#cake-canvas-layer-" + layer_id + " .img1").attr('src', img);

          $("#cake-canvas-layer-" + layer_id + " .img1").attr('data-layer-price', price);

var  vcvc ="<img class='new' src="+img+">";
var    newx  =$(this); 





          computePrice();
      });



       $(document).on('click', '.thumb2-layer-1,.thumb2-layer-2,.thumb2-layer-3,.thumb2-layer-4,.thumb2-layer-5', function() {

          var img = $(this).attr('src');

          price = $(this).data('price');
          $("#cake-canvas-layer-" + layer_id2 + " .img2").attr('src', img);

          $("#cake-canvas-layer-" + layer_id2 + " .img2").attr('data-layer-price', price);

          computePrice();


      });



      $(document).on('click', '.c-tool-5,.c-tool-4,.c-tool-3,.c-tool-2,.c-tool-1', function() {

          layer_id = $(this).data('layer');

          $('.ab').removeClass('bg_y');
          $(this).addClass('bg_y');


          $("#cake-canvas-layer-" + layer_id + " .img1").addClass('bg_y');
          $('#item-container1').html('');

          loadCakesLayer();


      });




       $(document).on('click', '.c2-tool-5,.c2-tool-4,.c2-tool-3,.c2-tool-2,.c2-tool-1', function() {

          layer_id2 = $(this).data('layer');

          $('.ab').removeClass('bg_y');
          $(this).addClass('bg_y');


          $("#cake-canvas-layer-" + layer_id + " .img2").addClass('bg_y');
        


      });



      $(document).on('click', '.tool-add', function() {



          if (layer_count <= 5) {
              layer_count++;
              $("#cake-canvas-layer-" + layer_count + " .img1").attr('src', '../../assets-apps/img/basecake/base.png');
              $(".c-tool-" + layer_count + "").show();
              $(".c2-tool-" + layer_count + "").show();
              $('.ab').removeClass('bg_y');
              computePrice();



          }

          if (layer_count == 1) {
              loadCakesLayer();
              loadDecorationLayer();

          }


      });

      $(document).on('click', '.tool-remove', function() {




          if (layer_count >= 0) {
              layer_count--;
              $("#cake-canvas-layer-" + layer_count + " .img1").attr('src', '');
              $("#cake-canvas-layer-" + layer_count + " .img1").attr('data-layer-price', 0);

              $("#cake-canvas-layer-" + layer_count + " .img2").attr('src', '');
              $("#cake-canvas-layer-" + layer_count + " .img2").attr('data-layer-price', 0);


              $(".c-tool-" + layer_count + "").hide();
              $('.ab').removeClass('bg_y');
              computePrice();

              if (layer_count == 0) {
                  $('#item-container1').html('');
                  $("#cake-canvas-layer-1 img, #cake-canvas-layer-2 img , #cake-canvas-layer-3 img ,#cake-canvas-layer-4 img , #cake-canvas-layer-5 img").attr('src', '');
                  price = 0;
                  $('.step-total-price').html('0');



                   $('#item-container2').html('');
                
              }


          }




      });


      $('#item-container1,#item-container2').click(function() {

          $('.ab').removeClass('bg_y');

      });



      $('.c-tool-5,.c-tool-4,.c-tool-3,.c-tool-2,.c-tool-1').hide();
      $('.c2-tool-5,.c2-tool-4,.c2-tool-3,.c2-tool-2,.c2-tool-1').hide();
      $("#cake-canvas-layer-1 img, #cake-canvas-layer-2 img , #cake-canvas-layer-3 img ,#cake-canvas-layer-4 img , #cake-canvas-layer-5 img").attr('src', '');
      //$("#cake-canvas-layer-1 img, #cake-canvas-layer-2 img , #cake-canvas-layer-3 img ,#cake-canvas-layer-4 img , #cake-canvas-layer-5 img").hide();



      function createStructure(value) {
          var tags = "<div class='col-sm-2 cake-layer-box'><a><img data-price='" + value.price + "'  class='cake-layers thumb-layer-" + layer_id + "' src='" + value.image_path + "' alt='Image' class='img-responsive'></a><h5> " + value.cake_name + "</h5><h6> " + value.price + "</h6></div>";
          $('#item-container1').append(tags);

      }


function createStructureDeco(value) {
          var tags = "<div class='col-sm-2 cake-layer-box'><a><img data-price='" + value.price + "'  class='cake-layers thumb2-layer-" + layer_id + "' src='" + value.image_path + "' alt='Image' class='img-responsive'></a><h5> " + value.side_decoration_name + "</h5><h6> " + value.price + "</h6></div>";
          $('#item-container2').append(tags);

      }



  function createStructureTop(value) {
          var tags = "<div class='col-sm-2 cake-layer-box'><a><img data-price='" + value.price + "'  class='cake-layers thumb3-layer-" + layer_id + "' src='" + value.image_path + "' alt='Image' class='img-responsive'></a><h5> " + value.topping_name + "</h5><h6> " + value.price + "</h6></div>";
          $('#item-container3').append(tags);
$( ".thumb3-layer-" + layer_id).draggable();
      }    


      function loadCakesLayer() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Cake_' + layer_id + '/transaction/list', //call controller class/function to execute

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


        function loadDecorationLayer() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Side_decorations/transaction/list', //call controller class/function to execute

              success: function(response) {

                  console.log(response.data);


                  $.each(response.data, function(index, value) {

                      createStructureDeco(value);


                  });

              },
              error: function(xhr, status, error) {
                  // check status && error
                  console.log(xhr);
              }
          });

      }



          function loadToppings() {



          $.ajax({
              dataType: "json",
              type: "POST",
              url: http + 'Toppings/transaction/list', //call controller class/function to execute

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





      function computePrice() {


          var p1 = parseInt($("#cake-canvas-layer-1 .img1").attr('data-layer-price'));
          var p2 = parseInt($("#cake-canvas-layer-2 .img1").attr('data-layer-price'));
          var p3 = parseInt($("#cake-canvas-layer-3 .img1").attr('data-layer-price'));
          var p4 = parseInt($("#cake-canvas-layer-4 .img1").attr('data-layer-price'));
          var p5 = parseInt($("#cake-canvas-layer-5 .img1").attr('data-layer-price'));

        var d1 = parseInt($("#cake-canvas-layer-1 .img2").attr('data-layer-price'));
        var d2 = parseInt($("#cake-canvas-layer-2 .img2").attr('data-layer-price'));
        var d3 = parseInt($("#cake-canvas-layer-3 .img2").attr('data-layer-price'));
        var d4 = parseInt($("#cake-canvas-layer-4 .img2").attr('data-layer-price'));
        var d5 = parseInt($("#cake-canvas-layer-5 .img2").attr('data-layer-price'));

          step_1_total_price = parseInt(p1 + p2 + p3 + p4 + p5+d1 + d2 + d3 + d4 + d5);

          $('.step-total-price').html(step_1_total_price);
          $('.step-total-layers').html(layer_count);
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
                 name: "cake_structure",
                 value: $('.cake-canvas-box').html()
             });


              _data.push({
                 name: "cost",
                 value: $('.step-total-price').html()
             });


console.log(_data);

             $.ajax({
                 "dataType": "json",
                 "type": "POST",
                 "url": http + "Orders/transaction/create",
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
                         window.location.href = '../track_orders';
                     }, 1000);

                 }
             }).always(function() {

             });

       







  }




     });










  });