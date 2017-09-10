
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Orders extends CORE_Controller

    {
    function __construct()
        {
        parent::__construct('');
        $this->load->model(array(
            'Order_model',
            'Order_rc_model',
            'Order_cc_model'
        ));
        }

    public

    function transaction($txn = null)
        {
        switch ($txn)
            {
        case 'list':
            $response['data'] = $this->get_response_rows();
            $this->json_output(json_encode($response));
            break;

        case 'create':
            $m_order = $this->Order_model;
            $m_order->begin();
            $m_order->customer_id = $this->input->post('customer_id', TRUE);
            $m_order->grand_price = $this->input->post('grand_price', TRUE);
            $m_order->reference_no = $this->input->post('reference_no', TRUE);
            $m_order->payment_method = $this->input->post('payment_method', TRUE);
            $m_order->estimated_pickedup = date('Y-m-d', strtotime($this->input->post('estimated_pickedup', TRUE)));
            $m_order->suggestion_box = $this->input->post('suggestion_box', TRUE);
            $m_order->order_status = 'pending';
            $m_order->save();
            $order_id = $m_order->last_insert_id();
            $m_order_rc = $this->Order_rc_model;
            $ready_cake_id = $this->input->post('ready_cake_id', TRUE);
            $qty = $this->input->post('qty', TRUE);
            $u_price = $this->input->post('u_price', TRUE);
            $t_price = $this->input->post('t_price', TRUE);
            for ($i = 0; $i < count($ready_cake_id); $i++)
                {
                $m_order_rc->order_id = $order_id;
                $m_order_rc->ready_cake_id = $ready_cake_id[$i];
                $m_order_rc->qty = $qty[$i];
                $m_order_rc->u_price = $u_price[$i];
                $m_order_rc->t_price = $t_price[$i];
                $m_order_rc->save();
                }

            $m_order_cc = $this->Order_cc_model;
            $cake_template_id = $this->input->post('cake_template_id', TRUE);
            $qty_c = $this->input->post('qty_c', TRUE);
            $u_price_c = $this->input->post('u_price_c', TRUE);
            $t_price_c = $this->input->post('t_price_c', TRUE);
            for ($i = 0; $i < count($cake_template_id); $i++)
                {
                $m_order_cc->order_id = $order_id;
                $m_order_cc->cake_template_id = $cake_template_id[$i];
                $m_order_cc->qty_c = $qty_c[$i];
                $m_order_cc->u_price_c = $u_price_c[$i];
                $m_order_cc->t_price_c = $t_price_c[$i];
                $m_order_cc->save();
                }

            $m_order->commit();
            if ($m_order->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Order successfully';
                $response['row_added'] = $this->get_response_rows($order_id);
                }
              else
                {
                $response['title'] = 'Error!';
                $response['stat'] = 'error';
                $response['msg'] = 'Something went wrong! Please try again.';
                }

            $this->json_output(json_encode($response));
            break;

        case 'update':
            $m_order = $this->Order_model;
            $order_id = $this->input->post('order_id', TRUE);
            $m_order->begin();
            $m_order->suggestion_box = $this->input->post('suggestion_box', TRUE);
            $m_order->customer_id = $this->input->post('customer_id', TRUE);
            $m_order->grand_price = $this->input->post('grand_price', TRUE);
            $m_order->estimated_pickedup = date('Y-m-d', strtotime($this->input->post('estimated_pickedup', TRUE)));
            $m_order->date_finalized = $this->input->post('date_finalized', TRUE);
            $m_order->finalized_by = $this->input->post('finalized_by', TRUE);
            $m_order->is_finalized = $this->input->post('is_finalized', TRUE);
            $m_order->date_pickedup = $this->input->post('date_pickedup', TRUE);
            $m_order->is_pickedup = $this->input->post('is_pickedup', TRUE);
            $m_order->modify($order_id);
            $m_order->commit();
            if ($m_order->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Order updated!';
                $response['row_updated'] = $this->get_response_rows($order_id);
                }
              else
                {
                $response['title'] = 'Error!';
                $response['stat'] = 'error';
                $response['msg'] = 'Something went wrong! Please try again.';
                }

            $this->json_output(json_encode($response));
            break;

        case 'delete':
            $m_order = $this->Order_model;
            $order_id = $this->input->post('order_id', TRUE);
            $m_order->begin();
            $m_order->is_active = 0;
            $m_order->is_deleted = 1;
            $m_order->modify($order_id);
            $m_order->commit();
            if ($m_order->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Order deleted.';
                }
              else
                {
                $response['title'] = 'Error!';
                $response['stat'] = 'error';
                $response['msg'] = 'Something went wrong. Please try again later.';
                }

            $this->json_output(json_encode($response));
            break;

        case 'upload':
            $allowed = array(
                'png',
                'jpg',
                'jpeg',
                'bmp'
            );
            $data = array();
            $files = array();
            $directory = 'assets/images/order/';
            foreach($_FILES as $file)
                {
                $server_file_name = uniqid('');
                $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
                $file_path = $directory . $server_file_name . '.' . $extension;
                $orig_file_name = $file['name'];
                if (!in_array(strtolower($extension) , $allowed))
                    {
                    $response['title'] = 'Invalid!';
                    $response['stat'] = 'error';
                    $response['msg'] = 'Image is invalid. Please select a valid photo!';
                    die($this->json_output(json_encode($response)));
                    }

                if (move_uploaded_file($file['tmp_name'], $file_path))
                    {
                    $response['title'] = 'Success!';
                    $response['stat'] = 'success';
                    $response['msg'] = 'Image successfully uploaded.';
                    $response['path'] = $file_path;
                    $this->json_output(json_encode($response));
                    }
                }

            break;
            }
        }

    private
    function get_response_rows($id = null)
        {
        $m_order = $this->Order_model;
        return $m_order->get_list('orders.is_active=TRUE AND orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND orders.order_id=' . $id) , array(
            'orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'orders.customer_id=c.customer_id',
                'left'
            )
        ));
        }

    public

    function get_customer_orders($id)
        {
        $m_order = $this->Order_model;
        $response['data'] = $m_order->get_list('orders.is_active=TRUE AND orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND orders.customer_id=' . $id) , array(
            'orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'orders.customer_id=c.customer_id',
                'inner'
            )
        ));
        $this->json_output(json_encode($response));
        }

    public

    function cancel_order()
        {
        $m_order = $this->Order_model;
        $order_id = $this->input->post('order_id', TRUE);
        $m_order->begin();
        $m_order->order_status = $this->input->post('order_status', TRUE);
        $m_order->modify($order_id);
        $m_order->commit();
        if ($m_order->status() === TRUE)
            {
            $response['title'] = 'Success!';
            $response['stat'] = 'success';
            $response['msg'] = 'Order Canceled successfully!';
            $response['row_updated'] = $this->get_response_rows($order_id);
            }
          else
            {
            $response['title'] = 'Error!';
            $response['stat'] = 'error';
            $response['msg'] = 'Something went wrong. Please try again later.';
            }

        $this->json_output(json_encode($response));
        }

    public

    function process_order()
        {
        $m_order = $this->Order_model;
        $order_id = $this->input->post('order_id', TRUE);
        $m_order->begin();
        $m_order->date_pickedup = date('Y-m-d', strtotime($this->input->post('date_pickedup', TRUE)));
        $m_order->order_status = $this->input->post('order_status', TRUE);
        $m_order->modify($order_id);
        $m_order->commit();
        if ($m_order->status() === TRUE)
            {
            $response['title'] = 'Success!';
            $response['stat'] = 'success';
            $response['msg'] = 'Order Updated successfully!';
            $response['row_updated'] = $this->get_response_rows($order_id);
            }
          else
            {
            $response['title'] = 'Error!';
            $response['stat'] = 'error';
            $response['msg'] = 'Something went wrong. Please try again later.';
            }

        $this->json_output(json_encode($response));
        }

    public

    function view_order_details_rc($id = null)
        {
        $m_order = $this->Order_model;
        $response['data'] = $m_order->get_list('orders.is_active=TRUE AND orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND orders.order_id=' . $id) , array(
            'orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname',
            'or.*',
            'rc.*'
        ) , array(
            array(
                'customers as c',
                'orders.customer_id=c.customer_id',
                'inner'
            ) ,
            array(
                'order_details_rc  as or',
                'orders.order_id=or.order_id',
                'inner'
            ) ,
            array(
                'ready_cake  as rc',
                'or.ready_cake_id=rc.ready_cake_id',
                'inner'
            )
        ));
        $this->json_output(json_encode($response));
        }

    public

    function view_order_details_cc($id = null)
        {
        $m_order = $this->Order_model;
        $response['data'] = $m_order->get_list('orders.is_active=TRUE AND orders.is_deleted=FALSE ' . ($id == null ? '' : ' AND orders.order_id=' . $id) , array(
            'orders.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname',
            'cc.*',
            'ct.*'
        ) , array(
            array(
                'customers as c',
                'orders.customer_id=c.customer_id',
                'inner'
            ) ,
            array(
                'order_details_cc  as cc',
                'orders.order_id=cc.order_id',
                'inner'
            ) ,
            array(
                'cake_templates  as ct',
                'cc.cake_template_id=ct.cake_template_id',
                'inner'
            )
        ));
        $this->json_output(json_encode($response));
        }
    }
