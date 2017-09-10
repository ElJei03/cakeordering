<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class CORE_Controller extends CI_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        
        
    }
    
    
    function validate_session()
    {
        if (!$this->session->user_id) {
            redirect(base_url() . 'login');
        }
    }
    
    
    function end_session()
    {
        session_destroy();
        redirect(base_url() . 'login');
    }
    
    function get_numeric_value($str)
    {
        return (float) str_replace(',', '', $str);
    }
    
    
    function custom_token()
    {
        if (!isset($_GET['token']) || $_GET['token'] != 'nexuslifeline') {
            redirect(base_url() . 'Error');
        }
    }
    
    function validate_token()
    {
        echo $this->security->get_csrf_token_name(); // for the name
        echo $this->security->get_csrf_hash(); // for the value   
    }
    

    function json_output($response){
        $this->output
        ->set_content_type('application/json')
        ->set_header('Access-Control-Allow-Origin:* ')
        ->set_output($response);
    }
}