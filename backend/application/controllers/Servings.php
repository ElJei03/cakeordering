<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Servings extends CORE_Controller
{
    function __construct()
    {
        

        parent::__construct('');
        $this->load->model(array(
            'Serving_model'
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
                $m_serving = $this->Serving_model;
                $m_serving->begin();
            
                $m_serving->serving_description = $this->input->post('serving_description', TRUE);
                $m_serving->layers = $this->input->post('layers', TRUE);
                $m_serving->price = $this->input->post('price', TRUE);
                $m_serving->size = $this->input->post('size', TRUE);
                $m_serving->image_path = $this->input->post('image_path', TRUE);                      
                
                // auditing purposes
                
                $m_serving->save();
                $serving_id = $m_serving->last_insert_id();
                $m_serving->commit();
                if ($m_serving->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Serving successfully added!';
                    $response['row_added'] = $this->get_response_rows($serving_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_serving = $this->Serving_model;
                $serving_id        = $this->input->post('serving_id', TRUE);
             
               
                   $m_serving->serving_description = $this->input->post('serving_description', TRUE);
                $m_serving->layers = $this->input->post('layers', TRUE);
                $m_serving->price = $this->input->post('price', TRUE);
                $m_serving->size = $this->input->post('size', TRUE);
                $m_serving->image_path = $this->input->post('image_path', TRUE);                      
                

                $m_serving->modify($serving_id);
                $m_serving->commit();
                if ($m_serving->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Serving successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($serving_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_serving = $this->Serving_model;
                $serving_id        = $this->input->post('serving_id', TRUE);
                $m_serving->begin();
        
                $m_serving->is_active = 0;
                $m_serving->is_deleted = 1;
                $m_serving->modify($serving_id);
                $m_serving->commit();
                if ($m_serving->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Serving  successfully deleted.';
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
                $directory = 'assets/images/servings/';
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
        $m_serving=$this->Serving_model;

        return  $m_serving->get_list(

            //send the parameter for filtering
            'servings.is_active=1 AND servings.is_deleted=0'.($id==null?'':' AND servings.serving_id='.$id),

            //send array parameter for fields required
            array(
                'servings.*'
            )
        );

    }
    

    
    
}


