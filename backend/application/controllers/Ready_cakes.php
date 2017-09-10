<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Ready_cakes extends CORE_Controller
{
    function __construct()
    {
        
        
        parent::__construct('');
        $this->load->model(array(
            'Ready_cake_model'
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
                $m_ready_cake = $this->Ready_cake_model;
                $m_ready_cake->begin();
                $m_ready_cake->ready_cake_name        = $this->input->post('ready_cake_name', TRUE);
                $m_ready_cake->ready_cake_description = $this->input->post('ready_cake_description', TRUE);
                $m_ready_cake->category_id = $this->input->post('category_id', TRUE);
                $m_ready_cake->price                  = $this->input->post('price', TRUE);
                $m_ready_cake->image_path             = $this->input->post('image_path', TRUE);
                
                
                
                // auditing purposes
                
                $m_ready_cake->save();
                $ready_cake_id = $m_ready_cake->last_insert_id();
                $m_ready_cake->commit();
                if ($m_ready_cake->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Cake  successfully added!';
                    $response['row_added'] = $this->get_response_rows($ready_cake_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_ready_cake  = $this->Ready_cake_model;
                $ready_cake_id = $this->input->post('ready_cake_id', TRUE);
                
                
                $m_ready_cake->ready_cake_name        = $this->input->post('ready_cake_name', TRUE);
                $m_ready_cake->ready_cake_description = $this->input->post('ready_cake_description', TRUE);
                $m_ready_cake->category_id = $this->input->post('category_id', TRUE);
                $m_ready_cake->price                  = $this->input->post('price', TRUE);
                $m_ready_cake->image_path             = $this->input->post('image_path', TRUE);
                      
                
                $m_ready_cake->modify($ready_cake_id);
                $m_ready_cake->commit();
                if ($m_ready_cake->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Cake  successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($ready_cake_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_ready_cake  = $this->Ready_cake_model;
                $ready_cake_id = $this->input->post('ready_cake_id', TRUE);
                $m_ready_cake->begin();
                
                $m_ready_cake->is_active  = 0;
                $m_ready_cake->is_deleted = 1;
                $m_ready_cake->modify($ready_cake_id);
                $m_ready_cake->commit();
                if ($m_ready_cake->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Cake  successfully deleted.';
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
                $directory = 'assets/images/ready_cake/';
                foreach ($_FILES as $file) {
                    $server_file_name = uniqid('');
                    $extension        = pathinfo($file['name'], PATHINFO_EXTENSION);
                    $file_path        = $directory . $server_file_name . '.' . $extension;
                    $orig_file_name   = $file['name'];
                    if (!in_array(strtolower($extension), $allowed)) {
                        $response['title'] = 'Invalid!';
                        $response['stat']  = 'error';
                        $response['msg']   = 'Image is invalid. Please select a valid photo!';
                        die($this->json_output(json_encode($response)));
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
    
    
    private function get_response_rows($id = null)
    {
        $m_ready_cake = $this->Ready_cake_model;
        
        return $m_ready_cake->get_list(
        //send the parameter for filtering
            'ready_cake.is_active=1 AND ready_cake.is_deleted=0' . ($id == null ? '' : ' AND ready_cake.ready_cake_id=' . $id )  , 
        //send array parameter for fields required
            array(
            'ready_cake.*',
            'cat.*'
        ), array(
            array(
                'categories as cat',
                'ready_cake.category_id=cat.category_id',
                'inner'
            )
        ));
        
    }



        public function get_selected_items($cat=null)
    {
        $m_ready_cake = $this->Ready_cake_model;
        
       $response['data']  = $m_ready_cake->get_list(
        //send the parameter for filtering
            'ready_cake.is_active=1 AND ready_cake.is_deleted=0' .($cat == null ? '' : ' AND ready_cake.category_id=' . $cat )  , 
        //send array parameter for fields required
            array(
            'ready_cake.*',
            'cat.*'
        ), array(
            array(
                'categories as cat',
                'ready_cake.category_id=cat.category_id',
                'inner'
            )
        ));

         $this->json_output(json_encode($response));
    }
    
    
    
    
}
