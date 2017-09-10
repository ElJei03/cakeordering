<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Payments extends CORE_Controller
{
    function __construct()
    {
        
        
        parent::__construct('');
        $this->load->model(array(
            'Payment_model'
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
                $m_payment = $this->Payment_model;
                $m_payment->begin();
            $m_payment->or_no     = $this->input->post('or_no', TRUE);
            $m_payment->date_paid     = date('Y-m-d', strtotime($this->input->post('date_paid', TRUE)));
            $m_payment->customer_id        = $this->input->post('customer_id', TRUE);
            $m_payment->cake_order_id        = $this->input->post('cake_order_id', TRUE);
            $m_payment->notes        = $this->input->post('notes', TRUE);
               
                $m_payment->save();
                $payment_id = $m_payment->last_insert_id();
                $m_payment->commit();
                if ($m_payment->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Payment successfully';
                    $response['row_added'] = $this->get_response_rows($payment_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_payment       = $this->Payment_model;
                $payment_id = $this->input->post('payment_id', TRUE);
                 $m_payment->begin();
                $ $m_payment->or_no     = $this->input->post('or_no', TRUE);
            $m_payment->date_paid     = date('Y-m-d', strtotime($this->input->post('date_paid', TRUE)));
            $m_payment->customer_id        = $this->input->post('customer_id', TRUE);
            $m_payment->cake_order_id        = $this->input->post('cake_order_id', TRUE);
            $m_payment->notes        = $this->input->post('notes', TRUE);
                
                
                $m_payment->modify($payment_id);
                $m_payment->commit();
                if ($m_payment->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Payment updated!';
                    $response['row_updated'] = $this->get_response_rows($payment_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_payment       = $this->Payment_model;
                $payment_id = $this->input->post('payment_id', TRUE);
                $m_payment->begin();
                
                $m_payment->is_active  = 0;
                $m_payment->is_deleted = 1;
                $m_payment->modify($payment_id);
                $m_payment->commit();
                if ($m_payment->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Payment deleted.';
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
                $directory = 'assets/images/order/';
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
        $m_payment = $this->Payment_model;
        return $m_payment->get_list('payments.is_active=TRUE AND payments.is_deleted=FALSE ' . ($id == null ? '' : ' AND payments.payment_id=' . $id), array(
            'payments.*',
            'c.*',
            'co.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ), array(
            array(
                'cake_orders as co',
                'payments.cake_order_id=co.cake_order_id',
                'left'
            ),
                        array(
                'customers as c',
                'payments.customer_id=c.customer_id',
                'left'
            )


        ));
    }
    
    
    
    
}
