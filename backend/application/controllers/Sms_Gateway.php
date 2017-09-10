<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Sms_Gateway extends CORE_Controller
{
    function __construct()
    {
        
        //$this->custom_token();
        
        parent::__construct('');
        $this->load->model(array(
            'Cake_sms_model'
        ));
        
    }
    
    
    
    public function transaction($txn = null)
    {

       switch ($txn) {
            case 'list':
                $response['data'] = $this->get_response_rows();
                  $this->json_output(json_encode($response));
                break;
        }

        

    }
    
    private function get_response_rows($id = null)
    {
        $m_cust_account = $this->Cake_sms_model;
        
        return $m_cust_account->get_list(
        //send array parameter for fields required
            array(
            'cake_sms.*',
            
           
        ));
        
    }
    
}