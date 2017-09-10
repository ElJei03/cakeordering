<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Toppings extends CORE_Controller
{
    function __construct()
    {
        

        parent::__construct('');
        $this->load->model(array(
            'Other_topping_model'
        ));
        
    }
    
   
    public function transaction($txn = null)
    {
        switch ($txn) {
            case 'list':
                $response['data'] = $this->get_response_rows();
                  $this->json_output(json_encode($response));
                break;
            
            case 'create':
                $m_topping = $this->Other_topping_model;
                $m_topping->begin();
                $m_topping->topping_name = $this->input->post('topping_name', TRUE);
                $m_topping->topping_description = $this->input->post('topping_description', TRUE);
                $m_topping->price = $this->input->post('price', TRUE);
                $m_topping->image_path = $this->input->post('image_path', TRUE);
             
              
                
                // auditing purposes
                
                $m_topping->save();
                $topping_id = $m_topping->last_insert_id();
                $m_topping->commit();
                if ($m_topping->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Cake Topping successfully added!';
                    $response['row_added'] = $this->get_response_rows($topping_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                  $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_topping = $this->Other_topping_model;
                $topping_id        = $this->input->post('topping_id', TRUE);
             
               
                $m_topping->topping_name = $this->input->post('topping_name', TRUE);
                $m_topping->topping_description = $this->input->post('topping_description', TRUE);
                $m_topping->price = $this->input->post('price', TRUE);
                $m_topping->image_path = $this->input->post('image_path', TRUE);


                $m_topping->modify($topping_id);
                $m_topping->commit();
                if ($m_topping->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Cake Topping successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($topping_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_topping = $this->Other_topping_model;
                $topping_id        = $this->input->post('topping_id', TRUE);
                $m_topping->begin();
        
                $m_topping->is_active = 0;
                $m_topping->is_deleted = 1;
                $m_topping->modify($topping_id);
                $m_topping->commit();
                if ($m_topping->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Cake Topping successfully deleted.';
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong. Please try again later.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'upload':
                $allowed   = array(
                    'png',
                    'jpg',
                    'jpeg',
                    'bmp'
                );
                $data      = array();
                $files     = array();
                $directory = 'assets/images/topping/';
                foreach ($_FILES as $file) {
                    $server_file_name = uniqid('');
                    $extension        = pathinfo($file['name'], PATHINFO_EXTENSION);
                    $file_path        = $directory . $server_file_name . '.' . $extension;
                    $orig_file_name   = $file['name'];
                    if (!in_array(strtolower($extension), $allowed)) {
                        $response['title'] = 'Invalid!';
                        $response['stat']  = 'error';
                        $response['msg']   = 'Image is invalid. Please select a valid photo!';
                        die(   $this->json_output(json_encode($response)));
                    }
                    
                    if (move_uploaded_file($file['tmp_name'], $file_path)) {
                        $response['title'] = 'Success!';
                        $response['stat']  = 'success';
                        $response['msg']   = 'Image successfully uploaded.';
                        $response['path']  = $file_path;
                          $this->json_output(json_encode($response));
                    }
                }
                
                break;
            
   
        }
    }
    
    
      private  function get_response_rows($id=null){
        $m_topping=$this->Other_topping_model;

        return  $m_topping->get_list(

            //send the parameter for filtering
            'other_toppings.is_active=1 AND other_toppings.is_deleted=0'.($id==null?'':' AND other_toppings.topping_id='.$id),

            //send array parameter for fields required
            array(
                'other_toppings.*'
            )
        );

    }
    

    
    
}


