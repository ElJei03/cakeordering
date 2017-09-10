<?php


defined('BASEPATH') OR exit('No direct script access allowed');
class Ready_Made_Orders extends CORE_Controller
{
    function __construct()
    {
        
        
        parent::__construct('');
        $this->load->model(array(
            'Ready_made_cake_order_model',
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
                $m_ready_cake_order = $this->Ready_made_cake_order_model;
                $m_ready_cake_order->begin();
                $m_ready_cake_order->ready_cake_id     = $this->input->post('ready_cake_id', TRUE);
                $m_ready_cake_order->suggestion_box     = $this->input->post('suggestion_box', TRUE);
                $m_ready_cake_order->customer_id        = $this->input->post('customer_id', TRUE);
                $m_ready_cake_order->cost               = $this->input->post('cost', TRUE);
                $m_ready_cake_order->order_status         = 'pending';
                $m_ready_cake_order->estimated_pickedup = date('Y-m-d', strtotime($this->input->post('estimated_pickedup', TRUE)));
                $m_ready_cake_order->save();
                $ready_cake_order_id = $m_ready_cake_order->last_insert_id();
                $m_ready_cake_order->commit();
                if ($m_ready_cake_order->status() === TRUE) {
                    $response['title']     = 'Success!';
                    $response['stat']      = 'success';
                    $response['msg']       = 'Order successfully';
                    $response['row_added'] = $this->get_response_rows($ready_cake_order_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'update':
                $m_ready_cake_order       = $this->Ready_made_cake_order_model;
                $ready_cake_order_id = $this->input->post('ready_cake_order_id', TRUE);
                
                $m_ready_cake_order->begin();
                $m_ready_cake_order->ready_cake_id      = $this->input->post('ready_cake_id', TRUE);
                $m_ready_cake_order->suggestion_box     = $this->input->post('suggestion_box', TRUE);
                $m_ready_cake_order->customer_id        = $this->input->post('customer_id', TRUE);
                $m_ready_cake_order->cost               = $this->input->post('cost', TRUE);
                $m_ready_cake_order->estimated_pickedup = date('Y-m-d', strtotime($this->input->post('estimated_pickedup', TRUE)));
                
                
                $m_ready_cake_order->date_finalized = $this->input->post('date_finalized', TRUE);
                $m_ready_cake_order->finalized_by   = $this->input->post('finalized_by', TRUE);
                $m_ready_cake_order->is_finalized   = $this->input->post('is_finalized', TRUE);
                $m_ready_cake_order->date_pickedup  = $this->input->post('date_pickedup', TRUE);
                $m_ready_cake_order->is_pickedup    = $this->input->post('is_pickedup', TRUE);
                
                
                $m_ready_cake_order->modify($ready_cake_order_id);
                $m_ready_cake_order->commit();
                if ($m_ready_cake_order->status() === TRUE) {
                    $response['title']       = 'Success!';
                    $response['stat']        = 'success';
                    $response['msg']         = 'Order updated!';
                    $response['row_updated'] = $this->get_response_rows($ready_cake_order_id);
                } else {
                    $response['title'] = 'Error!';
                    $response['stat']  = 'error';
                    $response['msg']   = 'Something went wrong! Please try again.';
                }
                
                $this->json_output(json_encode($response));
                break;
            
            case 'delete':
                $m_ready_cake_order       = $this->Ready_made_cake_order_model;
                $ready_cake_order_id = $this->input->post('ready_cake_order_id', TRUE);
                $m_ready_cake_order->begin();
                
                $m_ready_cake_order->is_active  = 0;
                $m_ready_cake_order->is_deleted = 1;
                $m_ready_cake_order->modify($ready_cake_order_id);
                $m_ready_cake_order->commit();
                if ($m_ready_cake_order->status() === TRUE) {
                    $response['title'] = 'Success!';
                    $response['stat']  = 'success';
                    $response['msg']   = 'Order deleted.';
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
                $directory = 'assets/images/ready_cake_order/';
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
        $m_ready_cake_order = $this->Ready_made_cake_order_model;
        return $m_ready_cake_order->get_list('ready_cake_orders.is_active=TRUE AND ready_cake_orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND ready_cake_orders.ready_cake_order_id=' . $id), array(
            'ready_cake_orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname',
            'rd.*'
        ), array(
            array(
                'customers as c',
                'ready_cake_orders.customer_id=c.customer_id',
                'left'
            ),
            array(
                'ready_cake as rd',
                'ready_cake_orders.ready_cake_id=rd.ready_cake_id',
                'left'
            )
        ));
    }
    
    
    
    public function get_customer_orders($id)
    {
        
        
        $m_ready_cake_order          = $this->Ready_made_cake_order_model;
        $response['data'] = $m_ready_cake_order->get_list('ready_cake_orders.is_active=TRUE AND ready_cake_orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND ready_cake_orders.customer_id=' . $id), array(
            'ready_cake_orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname',
            'rd.*'
        ), array(
            array(
                'customers as c',
                'ready_cake_orders.customer_id=c.customer_id',
                'left'
            ),
            array(
                'ready_cake as rd',
                'ready_cake_orders.ready_cake_id=rd.ready_cake_id',
                'left'
            )
        ));
        
        $this->json_output(json_encode($response));
        
    }
    
    
    
    public function cancel_order()
    {
        
        $m_ready_cake_order       = $this->Ready_made_cake_order_model;
        $ready_cake_order_id = $this->input->post('ready_cake_order_id', TRUE);
        $m_ready_cake_order->begin();
        $m_ready_cake_order->order_status = $this->input->post('order_status', TRUE);
        $m_ready_cake_order->modify($ready_cake_order_id);
        $m_ready_cake_order->commit();
        if ($m_ready_cake_order->status() === TRUE) {
            $response['title']       = 'Success!';
            $response['stat']        = 'success';
            $response['msg']         = 'Order Updated successfully!';
            $response['row_updated'] = $this->get_response_rows($ready_cake_order_id);
        } else {
            $response['title'] = 'Error!';
            $response['stat']  = 'error';
            $response['msg']   = 'Something went wrong. Please try again later.';
        }
        
        $this->json_output(json_encode($response));
        
        
    }
    
    
    
    
    public function process_order()
    {
        
        $m_ready_cake_order       = $this->Ready_made_cake_order_model;
        $ready_cake_order_id = $this->input->post('ready_cake_order_id', TRUE);
        
        $m_ready_cake_order->begin();
        $m_ready_cake_order->date_pickedup = date('Y-m-d', strtotime($this->input->post('date_pickedup', TRUE)));
        $m_ready_cake_order->order_status  = $this->input->post('order_status', TRUE);
        $m_ready_cake_order->modify($ready_cake_order_id);        
        $m_ready_cake_order->commit();
        if ($m_ready_cake_order->status() === TRUE) {



      
            $response['title']       = 'Success!';
            $response['stat']        = 'success';
            $response['msg']         = 'Order Updated successfully!';
            $response['row_updated'] = $this->get_response_rows($ready_cake_order_id);
        } else {
            $response['title'] = 'Error!';
            $response['stat']  = 'error';
            $response['msg']   = 'Something went wrong. Please try again later.';
        }
        
        $this->json_output(json_encode($response));
        
        
    }
    
    
    
}