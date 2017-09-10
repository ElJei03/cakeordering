
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User_graphics extends CORE_Controller

    {
    function __construct()
        {
        parent::__construct('');
        $this->load->model(array(
            'User_graphic_model'
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
            $m_user_graphic = $this->User_graphic_model;
            $m_user_graphic->begin();
            $m_user_graphic->graphic_name = $this->input->post('graphic_name', TRUE);
            $m_user_graphic->graphic_description = $this->input->post('graphic_description', TRUE);
            $m_user_graphic->price = $this->input->post('price', TRUE);
            $m_user_graphic->image_path = $this->input->post('image_path', TRUE);
            $m_user_graphic->customer_id = $this->input->post('customer_id', TRUE);

            // auditing purposes

            $m_user_graphic->save();
            $graphic_id = $m_user_graphic->last_insert_id();
            $m_user_graphic->commit();
            if ($m_user_graphic->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'User Graphics successfully added!';
                $response['row_added'] = $this->get_response_rows($graphic_id);
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
            $m_user_graphic = $this->User_graphic_model;
            $graphic_id = $this->input->post('graphic_id', TRUE);
            $m_user_graphic->graphic_name = $this->input->post('graphic_name', TRUE);
            $m_user_graphic->graphic_description = $this->input->post('graphic_description', TRUE);
            $m_user_graphic->price = $this->input->post('price', TRUE);
            $m_user_graphic->image_path = $this->input->post('image_path', TRUE);
            $m_user_graphic->customer_id = $this->input->post('customer_id', TRUE);
            $m_user_graphic->modify($graphic_id);
            $m_user_graphic->commit();
            if ($m_user_graphic->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'User Graphics successfully updated.';
                $response['row_updated'] = $this->get_response_rows($graphic_id);
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
            $m_user_graphic = $this->User_graphic_model;
            $graphic_id = $this->input->post('graphic_id', TRUE);
            $m_user_graphic->begin();
            $m_user_graphic->is_active = 0;
            $m_user_graphic->is_deleted = 1;
            $m_user_graphic->modify($graphic_id);
            $m_user_graphic->commit();
            if ($m_user_graphic->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'User Graphics successfully deleted.';
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
            $directory = 'assets/images/user_graphics/';
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
        $m_user_graphic = $this->User_graphic_model;
        return $m_user_graphic->get_list('user_graphics.is_active=TRUE AND user_graphics.is_deleted=FALSE ' . ($id == null ? '' : ' AND user_graphics.graphic_id=' . $id) , array(
            'user_graphics.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'user_graphics.customer_id=c.customer_id',
                'left'
            )
        ));
        }

    public

    function get_customer_graphics($id)
        {
        $m_user_graphic = $this->User_graphic_model;
        $response['data'] = $m_user_graphic->get_list('user_graphics.is_active=TRUE AND user_graphics.is_deleted=FALSE ' . ($id == null ? '' : ' AND user_graphics.customer_id=' . $id) , array(
            'user_graphics.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'user_graphics.customer_id=c.customer_id',
                'left'
            )
        ));
        $this->json_output(json_encode($response));
        }
    }

