<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users extends CORE_Controller
{
    function __construct()
    {

        //$this->custom_token();
     
        parent::__construct('');
        $this->load->model(array(
            'User_account_model'
        ));
        
    }
    
    public function index()
    {
        echo "Test";
    }
    
    public function transaction($txn = null)
    {
        switch ($txn) {
            case 'list':
                $response['data'] = $this->get_response_rows();
                echo json_encode($response);
                break;
            
            case 'create':
                $m_user_account = $this->User_account_model;
                $user_email     = $this->input->post('user_email', TRUE);
                if ($this->input->post('user_email') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid email address!';
                    echo json_encode($response);
                    exit;
                }
                
                if ($this->input->post('user_pword') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid user password!';
                    echo json_encode($response);
                    exit;
                }
                
                if ($this->input->post('user_cpword') != $this->input->post('user_pword')) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Password did not match!';
                    echo json_encode($response);
                    exit;
                }
                
                // validate if user_email is already registered
                
                $user_email_exists = $m_user_account->get_list(array(
                    'user_accounts.user_email' => $user_email
                ));
                if (count($user_email_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This email is already in use.';
                    echo json_encode($response);
                    exit;
                }
                
                // validate if username is already registered
                
                $user_uname        = $this->input->post('user_uname', TRUE);
                $user_uname_exists = $m_user_account->get_list(array(
                    'user_accounts.user_uname' => $user_uname
                ));
                if (count($user_uname_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This username is already in use.';
                    echo json_encode($response);
                    exit;
                }
                
                $m_user_account->begin();
                $m_user_account->user_uname = $this->input->post('user_uname', TRUE);
                $m_user_account->user_pword = sha1($this->input->post('user_pword', TRUE));
                $m_user_account->user_email = $this->input->post('user_email', TRUE);
                $m_user_account->user_fname = $this->input->post('user_fname', TRUE);
                $m_user_account->user_lname = $this->input->post('user_lname', TRUE);
                $m_user_account->user_mname = $this->input->post('user_mname', TRUE);
                $m_user_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_user_account->address    = $this->input->post('address', TRUE);
                $m_user_account->user_bdate = date('Y-m-d', strtotime($this->input->post('user_bdate', TRUE)));
                
                // auditing purposes
                
                $m_user_account->save();
                $user_id = $m_user_account->last_insert_id();
                $m_user_account->commit();
                if ($m_user_account->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'User successfully registered.';
                    $response['row_added'] = $this->get_response_rows($user_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                echo json_encode($response);
                break;
            
            case 'update':
                $m_user_account = $this->User_account_model;
                $user_id        = $this->input->post('user_account_id', TRUE);
                if ($this->input->post('user_pword') != null) { //if password is provide, user wanted to update the password so it must be validated
                    if ($this->input->post('user_cpword') != $this->input->post('user_pword')) {
                        $response['title'] = 'Error!';
                        $response['stat']  = 'error';
                        $response['msg']   = 'Sorry, Password did not match!';
                        echo json_encode($response);
                        exit;
                    }
                }
                
                $m_user_account->begin();
                $m_user_account->user_uname = $this->input->post('user_uname', TRUE);
                if ($this->input->post('user_pword') != null) { //if not provided, do not updated password
                    $m_user_account->user_pword = sha1($this->input->post('user_pword', TRUE));
                }
                
                $m_user_account->user_uname = $this->input->post('user_uname', TRUE);
                $m_user_account->user_pword = sha1($this->input->post('user_pword', TRUE));
                $m_user_account->user_email = $this->input->post('user_email', TRUE);
                $m_user_account->user_fname = $this->input->post('user_fname', TRUE);
                $m_user_account->user_lname = $this->input->post('user_lname', TRUE);
                $m_user_account->user_mname = $this->input->post('user_mname', TRUE);
                $m_user_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_user_account->address    = $this->input->post('address', TRUE);
                $m_user_account->user_bdate = date('Y-m-d', strtotime($this->input->post('user_bdate', TRUE)));
                
                // auditing purposes
                
                $m_user_account->modify($user_id);
                $m_user_account->commit();
                if ($m_user_account->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'User information successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($user_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                echo json_encode($response);
                break;
            
            case 'delete':
                $m_user_account = $this->User_account_model;
                $user_id        = $this->input->post('user_account_id', TRUE);
                $m_user_account->begin();
                $m_user_account->is_deleted = 1;
             
                $m_user_account->modify($user_id);
                
                // make sure to update status of the user
                
                $m_user_account->is_active = 0;
                $m_user_account->modify($user_id);
                $m_user_account->commit();
                if ($m_user_account->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'User information successfully deleted.';
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong. Please try again later.';
                }
                
                echo json_encode($response);
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
                $directory = 'assets/images/user/';
                foreach ($_FILES as $file) {
                    $server_file_name = uniqid('');
                    $extension        = pathinfo($file['name'], PATHINFO_EXTENSION);
                    $file_path        = $directory . $server_file_name . '.' . $extension;
                    $orig_file_name   = $file['name'];
                    if (!in_array(strtolower($extension), $allowed)) {
                        $response['title'] = 'Invalid!';
                        $response['stat']  = 'error';
                        $response['msg']   = 'Image is invalid. Please select a valid photo!';
                        die(json_encode($response));
                    }
                    
                    if (move_uploaded_file($file['tmp_name'], $file_path)) {
                        $response['title'] = 'Success!';
                        $response['stat']  = 'success';
                        $response['msg']   = 'Image successfully uploaded.';
                        $response['path']  = $file_path;
                        echo json_encode($response);
                    }
                }
                
                break;
            
            case 'update-profile':
                $m_users                    = $this->User_account_model;
                $user_account_id            = 1; // Active User
                $m_user_account->user_uname = $this->input->post('user_uname', TRUE);
                if ($this->input->post('user_pword') != null) { //if not provided, do not updated password
                    $m_user_account->user_pword = sha1($this->input->post('user_pword', TRUE));
                }
                
                $m_user_account->user_uname = $this->input->post('user_uname', TRUE);
                $m_user_account->user_pword = sha1($this->input->post('user_pword', TRUE));
                $m_user_account->user_email = $this->input->post('user_email', TRUE);
                $m_user_account->user_fname = $this->input->post('user_fname', TRUE);
                $m_user_account->user_lname = $this->input->post('user_lname', TRUE);
                $m_user_account->user_mname = $this->input->post('user_mname', TRUE);
                $m_user_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_user_account->address    = $this->input->post('address', TRUE);
                $m_user_account->user_bdate = date('Y-m-d', strtotime($this->input->post('user_bdate', TRUE)));
                $m_users->user_photo        = $this->input->post('user_photo');
                
                $m_users->modify($user_account_id);
                $response['title'] = 'Success!';
                $response['stat']  = 'success';
                $response['msg']   = 'Profile successfully updated.';
                echo json_encode($response);
                break;
        }
    }
    
    private function get_response_rows($id = null)
    {
        $m_user_account = $this->User_account_model;
        return $m_user_account->get_list();
    }
}