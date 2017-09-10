<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Side_decorations extends CORE_Controller
{
    function __construct()
    {
        

        parent::__construct('');
        $this->load->model(array(
            'Side_decoration_model'
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
                $m_side_decoration = $this->Side_decoration_model;
                $m_side_decoration->begin();
                $m_side_decoration->side_decoration_name = $this->input->post('side_decoration_name', TRUE);
                $m_side_decoration->side_decoration_description = $this->input->post('side_decoration_description', TRUE);
                $m_side_decoration->price = $this->input->post('price', TRUE);
                $m_side_decoration->image_path = $this->input->post('image_path', TRUE);
             
              
                
                // auditing purposes
                
                $m_side_decoration->save();
                $side_decoration_id = $m_side_decoration->last_insert_id();
                $m_side_decoration->commit();
                if ($m_side_decoration->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Side Decoration successfully added!';
                    $response['row_added'] = $this->get_response_rows($side_decoration_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                  $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_side_decoration = $this->Side_decoration_model;
                $side_decoration_id        = $this->input->post('side_decoration_id', TRUE);
             
               
                $m_side_decoration->side_decoration_name = $this->input->post('side_decoration_name', TRUE);
                $m_side_decoration->side_decoration_description = $this->input->post('side_decoration_description', TRUE);
                $m_side_decoration->price = $this->input->post('price', TRUE);
                $m_side_decoration->image_path = $this->input->post('image_path', TRUE);


                $m_side_decoration->modify($side_decoration_id);
                $m_side_decoration->commit();
                if ($m_side_decoration->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Side Decoration successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($side_decoration_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_side_decoration = $this->Side_decoration_model;
                $side_decoration_id        = $this->input->post('side_decoration_id', TRUE);
                $m_side_decoration->begin();
        
                $m_side_decoration->is_active = 0;
                $m_side_decoration->is_deleted = 1;
                $m_side_decoration->modify($side_decoration_id);
                $m_side_decoration->commit();
                if ($m_side_decoration->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Side Decoration successfully deleted.';
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
                $directory = 'assets/images/side_decoration/';
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
        $m_side_decoration=$this->Side_decoration_model;

        return  $m_side_decoration->get_list(

            //send the parameter for filtering
            'side_decorations.is_active=1 AND side_decorations.is_deleted=0'.($id==null?'':' AND side_decorations.side_decoration_id='.$id),

            //send array parameter for fields required
            array(
                'side_decorations.*'
            )
        );

    }
    

    
    
}


