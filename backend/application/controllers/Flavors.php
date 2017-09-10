<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Flavors extends CORE_Controller
{
    function __construct()
    {
        

        parent::__construct('');
        $this->load->model(array(
            'Flavor_model'
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
                $m_flavor = $this->Flavor_model;
                $m_flavor->begin();
                $m_flavor->flavor_name = $this->input->post('flavor_name', TRUE);
                $m_flavor->flavor_description = $this->input->post('flavor_description', TRUE);
                $m_flavor->price = $this->input->post('price', TRUE);
                $m_flavor->image_path = $this->input->post('image_path', TRUE);                      
                
                // auditing purposes
                
                $m_flavor->save();
                $flavor_id = $m_flavor->last_insert_id();
                $m_flavor->commit();
                if ($m_flavor->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Flavor successfully added!';
                    $response['row_added'] = $this->get_response_rows($flavor_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_flavor = $this->Flavor_model;
                $flavor_id        = $this->input->post('flavor_id', TRUE);
             
               
                $m_flavor->flavor_name = $this->input->post('flavor_name', TRUE);
                $m_flavor->flavor_description = $this->input->post('flavor_description', TRUE);
                $m_flavor->price = $this->input->post('price', TRUE);
                $m_flavor->image_path = $this->input->post('image_path', TRUE);

                $m_flavor->modify($flavor_id);
                $m_flavor->commit();
                if ($m_flavor->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Flavor successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($flavor_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_flavor = $this->Flavor_model;
                $flavor_id        = $this->input->post('flavor_id', TRUE);
                $m_flavor->begin();
        
                $m_flavor->is_active = 0;
                $m_flavor->is_deleted = 1;
                $m_flavor->modify($flavor_id);
                $m_flavor->commit();
                if ($m_flavor->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Flavor  successfully deleted.';
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
                $directory = 'assets/images/flavors/';
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
        $m_flavor=$this->Flavor_model;

        return  $m_flavor->get_list(

            //send the parameter for filtering
            'flavors.is_active=1 AND flavors.is_deleted=0'.($id==null?'':' AND flavors.flavor_id='.$id),

            //send array parameter for fields required
            array(
                'flavors.*'
            )
        );

    }
    

    
    
}


