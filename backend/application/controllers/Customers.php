<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Customers extends CORE_Controller
{
    function __construct()
    {
        
        //$this->custom_token();
        
        parent::__construct('');
        $this->load->model(array(
            'Customer_model'
        ));
        
    }
    
    
    
    public function transaction($txn = null, $sms = null)
    {
        switch ($txn) {
            case 'list':
                $response['data'] = $this->get_response_rows();
                  $this->json_output(json_encode($response));
                break;
            
            case 'create':
                $m_cust_account = $this->Customer_model;
                
                
                $cust_email = $this->input->post('cust_email', TRUE);
                if ($this->input->post('cust_email') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid email address!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                
                
                
                // validate if cust_email is already registered
                
                $cust_email_exists = $m_cust_account->get_list(array(
                    'customers.cust_email' => $cust_email
                ));
                if (count($cust_email_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This email is already in use.';
                      $this->json_output(json_encode($response));
                    exit;
                }
                
                // validate if custname is already registered
                
                $cust_uname        = $this->input->post('cust_uname', TRUE);
                $cust_uname_exists = $m_cust_account->get_list(array(
                    'customers.cust_uname' => $cust_uname
                ));
                if (count($cust_uname_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This custname is already in use.';
                      $this->json_output(json_encode($response));
                    exit;
                }
                
                
                
                
                if ($this->input->post('cust_pword') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid  password!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                
                if ($this->input->post('cust_cpword') != $this->input->post('cust_pword')) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Password did not match!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                $random = md5(uniqid(rand(), true));
                $vcode  = substr($random, 0, 5);
                $m_cust_account->begin();
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                $m_cust_account->cust_pword = sha1($this->input->post('cust_pword', TRUE));
                $m_cust_account->cust_vcode = $vcode;
                $m_cust_account->cust_email = $this->input->post('cust_email', TRUE);
                $m_cust_account->cust_fname = $this->input->post('cust_fname', TRUE);
                $m_cust_account->cust_lname = $this->input->post('cust_lname', TRUE);
                $m_cust_account->cust_mname = $this->input->post('cust_mname', TRUE);
                $m_cust_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_cust_account->address    = $this->input->post('address', TRUE);
                $m_cust_account->cust_bdate = date('Y-m-d', strtotime($this->input->post('cust_bdate', TRUE)));
                
                // auditing purposes
                
                $m_cust_account->save();
                
                $customer_id = $m_cust_account->last_insert_id();
                
                $m_cust_account->commit();
                
                if ($m_cust_account->status() === TRUE) {
                    
                    $this->send($vcode);
                    
                    if ($sms == 'go') {
                        $this->sendsms($vcode);
                    } else {
                        
                    }
                    
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Customers successfully registered.';
                    $response['vcode']     = $vcode;
                    $response['cid']     = $customer_id;
                    $response['row_added'] = $this->get_response_rows($customer_id);
                    
                    
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                  $this->json_output(json_encode($response));
                break;
                
                
                
            case 'signup':
                $m_cust_account = $this->Customer_model;
                
                
                $cust_email = $this->input->post('cust_email', TRUE);
                if ($this->input->post('cust_email') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid email address!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                
                
                
                // validate if cust_email is already registered
                
                $cust_email_exists = $m_cust_account->get_list(array(
                    'customers.cust_email' => $cust_email
                ));
                if (count($cust_email_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This email is already in use.';
                      $this->json_output(json_encode($response));
                    exit;
                }
                
                // validate if custname is already registered
                
                $cust_uname        = $this->input->post('cust_uname', TRUE);
                $cust_uname_exists = $m_cust_account->get_list(array(
                    'customers.cust_uname' => $cust_uname
                ));
                if (count($cust_uname_exists) > 0) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, This custname is already in use.';
                      $this->json_output(json_encode($response));
                    exit;
                }
                
                
                
                
                if ($this->input->post('cust_pword') == null) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Invalid  password!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                
                if ($this->input->post('cust_cpword') != $this->input->post('cust_pword')) {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Sorry, Password did not match!';
                       $this->json_output(json_encode($response));
                    exit;
                }
                $random = md5(uniqid(rand(), true));
                $vcode  = substr($random, 0, 5);
                $m_cust_account->begin();
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                $m_cust_account->cust_pword = sha1($this->input->post('cust_pword', TRUE));
                $m_cust_account->cust_vcode = $vcode;
                $m_cust_account->cust_email = $this->input->post('cust_email', TRUE);
                $m_cust_account->cust_fname = $this->input->post('cust_fname', TRUE);
                $m_cust_account->cust_lname = $this->input->post('cust_lname', TRUE);
                $m_cust_account->cust_mname = $this->input->post('cust_mname', TRUE);
                $m_cust_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_cust_account->address    = $this->input->post('address', TRUE);
                $m_cust_account->cust_bdate = date('Y-m-d', strtotime($this->input->post('cust_bdate', TRUE)));
                $m_cust_account->is_active = 0;
                // auditing purposes
                
                $m_cust_account->save();
                
                $customer_id = $m_cust_account->last_insert_id();
                
                $m_cust_account->commit();
                
                if ($m_cust_account->status() === TRUE) {
                    
                    $this->send($vcode,$this->input->post('cust_email'));
                    
                    if ($sms == 'go') {
                        $this->sendsms($vcode,$this->input->post('contact_no'));
                    } else {
                        
                    }
                    
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Customers successfully registered.';
                    $response['vcode']     = $vcode;
                    $response['cid']     = $customer_id;
                    $response['row_added'] = $this->get_response_rows($customer_id);
                    
                    
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                  $this->json_output(json_encode($response));
                break;    
            
            case 'update':
                $m_cust_account = $this->Customer_model;
                $customer_id    = $this->input->post('customer_id', TRUE);
                if ($this->input->post('cust_pword') != null) { //if password is provide, cust wanted to update the password so it must be validated
                    if ($this->input->post('cust_cpword') != $this->input->post('cust_pword')) {
                        $response['title'] = 'Error!';
                        $response['stat']  = 'error';
                        $response['msg']   = 'Sorry, Password did not match!';
                           $this->json_output(json_encode($response));
                        exit;
                    }
                }
                
                $m_cust_account->begin();
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                if ($this->input->post('cust_pword') != null) { //if not provided, do not updated password
                    $m_cust_account->cust_pword = sha1($this->input->post('cust_pword', TRUE));
                }
                
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                $m_cust_account->cust_email = $this->input->post('cust_email', TRUE);
                $m_cust_account->cust_fname = $this->input->post('cust_fname', TRUE);
                $m_cust_account->cust_lname = $this->input->post('cust_lname', TRUE);
                $m_cust_account->cust_mname = $this->input->post('cust_mname', TRUE);
                $m_cust_account->cust_photo = $this->input->post('cust_photo', TRUE);
                $m_cust_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_cust_account->address    = $this->input->post('address', TRUE);
                $m_cust_account->cust_bdate = date('Y-m-d', strtotime($this->input->post('cust_bdate', TRUE)));
              
                // auditing purposes
                
                $m_cust_account->modify($customer_id);
                $m_cust_account->commit();
                if ($m_cust_account->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Customers information successfully updated.';
                    $response['row_updated'] = $this->get_response_rows($customer_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                   $this->json_output(json_encode($response));
                break;
            
            case 'update-isactive':
                $m_cust_account = $this->Customer_model;
               
                $customer_id    = $this->input->post('customer_id', TRUE);
              
                $m_cust_account->begin();
                $m_cust_account->is_active = 1;
                
                $m_cust_account->modify($customer_id);
                
                // make sure to update status of the cust
                
                $m_cust_account->is_active = 1;
                $m_cust_account->modify($customer_id);
                $m_cust_account->commit();
                
                if ($m_cust_account->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Customers information successfully updated.';
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong. Please try again later.';
                }
                
                   $this->json_output(json_encode($response));
                break;

            case 'delete':
                $m_cust_account = $this->Customer_model;
                $customer_id    = $this->input->post('customer_id', TRUE);
                $m_cust_account->begin();
                $m_cust_account->is_deleted = 1;
                
                $m_cust_account->modify($customer_id);
                
                // make sure to update status of the cust
                
                $m_cust_account->is_active = 0;
                $m_cust_account->modify($customer_id);
                $m_cust_account->commit();
                if ($m_cust_account->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Customers information successfully deleted.';
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
                $directory = 'assets/images/cust/';
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
            
            case 'update-profile':
                $m_custs                    = $this->Customer_model;
                $customer_id                = 1; // Active cust
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                if ($this->input->post('cust_pword') != null) { //if not provided, do not updated password
                    $m_cust_account->cust_pword = sha1($this->input->post('cust_pword', TRUE));
                }
                
                $m_cust_account->cust_uname = $this->input->post('cust_uname', TRUE);
                
                $m_cust_account->cust_email = $this->input->post('cust_email', TRUE);
                $m_cust_account->cust_fname = $this->input->post('cust_fname', TRUE);
                $m_cust_account->cust_lname = $this->input->post('cust_lname', TRUE);
                $m_cust_account->cust_mname = $this->input->post('cust_mname', TRUE);
                $m_cust_account->contact_no = $this->input->post('contact_no', TRUE);
                $m_cust_account->address    = $this->input->post('address', TRUE);
                $m_cust_account->cust_bdate = date('Y-m-d', strtotime($this->input->post('cust_bdate', TRUE)));
                $m_custs->cust_photo        = $this->input->post('cust_photo');
                
                $m_custs->modify($customer_id);
                $response['title'] = 'Success!';
                $response['stat']  = 'success';
                $response['msg']   = 'Profile successfully updated.';
                   $this->json_output(json_encode($response));
                break;
        }
    }
    
    private function get_response_rows($id = null)
    {
        $m_cust_account = $this->Customer_model;
        
        return $m_cust_account->get_list(
        //send the parameter for filtering
            'customers.is_active=1 AND customers.is_deleted=0' . ($id == null ? '' : ' AND customers.customer_id=' . $id), 
        //send array parameter for fields required
            array(
            'customers.*',
            
            'DATE_FORMAT(customers.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",customers.cust_fname,customers.cust_mname,customers.cust_lname) as cust_fullname'
        ));
        
    }
    
    public function auth_cust()
    {
        $cust_uname = $this->input->post('cust_uname');
        $cust_pword = sha1($this->input->post('cust_pword'));
        
        $m_cust_account = $this->Customer_model;
        $result         = $m_cust_account->get_list(array(
            'customers.cust_uname' => $cust_uname,
            'customers.cust_pword' => $cust_pword
        ));
        
        if (count($result) > 0) { //valid custname and pword
            
            
            $response['title'] = 'Success';
            $response['stat']  = 'success';
            $response['msg']   = 'Login successfully';
            $response['result']   = $result;
            
           $this->json_output(json_encode($response));
        } else {
            
            
            
            $response['title'] = 'Failed';
            $response['stat']  = 'error';
            $response['msg']   = 'Login not successful!';
              $this->json_output(json_encode($response));
        }
    }
    
    
    
    public function send($vcode = null, $fromEmail = null)
    {
        
        
        
        //Load email library
        $this->load->library('email');
        
        //SMTP & mail configuration
        $config = array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.googlemail.com',
            'smtp_port' => 465,
            'smtp_user' => 'exd.dev.sol@gmail.com',
            'smtp_pass' => 'QWERTY!@#',
            'mailtype' => 'html',
            'charset' => 'utf-8'
        );
        $this->email->initialize($config);
        $this->email->set_mailtype("html");
        $this->email->set_newline("\r\n");
        
        //Email content
        $htmlContent = '<h1>Sending email via SMTP server</h1>';
        $htmlContent .= '<p>Your Verification is : </p>' . $vcode;
        
       
        $this->email->to($fromEmail);
        $this->email->from('exd.dev.sol@gmail.com', 'Sweet Thumbs Cakes and Cupcakes');
        $this->email->subject('Verification Code');
        $this->email->message($htmlContent);
        
        //Send email
        $this->email->send();
        // return  $vcode;
        
    }
    
    
    public function sendsms($vcode = null,$smsNumber = null)
    {
        
        include "smsGateway.php";
        
        $smsGateway = new SmsGateway('exd.dev.sol@gmail.com', 'w3sTern03');
        $deviceID   = 56524;
        $number     = $smsNumber;
        $message    = 'Your 5 digit Verification Code is :' . $vcode;
        
        //Please note options is no required and can be left out
        $result = $smsGateway->sendMessageToNumber($number, $message, $deviceID);
        
    }
    
    
    
    
}