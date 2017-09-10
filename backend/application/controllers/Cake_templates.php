
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Cake_templates extends CORE_Controller

    {
    function __construct()
        {
        parent::__construct('');
        $this->load->model(array(
            'Cake_template_model'
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
            $m_c_template = $this->Cake_template_model;
            $m_c_template->begin();
            $m_c_template->cake_template_name = $this->input->post('cake_template_name', TRUE);
            $m_c_template->cake_template_description = $this->input->post('cake_template_description', TRUE);
            $m_c_template->front_view = $this->input->post('front_view',false);
            $m_c_template->rear_view = $this->input->post('rear_view',false);
            $m_c_template->tbl_details = $this->input->post('tbl_details',false);
            $m_c_template->estimated_price = $this->input->post('estimated_price', TRUE);
            $m_c_template->actual_price = $this->input->post('actual_price', TRUE);
            $m_c_template->customer_id = $this->input->post('customer_id', TRUE);
            $m_c_template->suggestion_box = $this->input->post('suggestion_box', TRUE);
            $m_c_template->dedication_details = $this->input->post('dedication_details', TRUE);
            $m_c_template->status = $this->input->post('status', TRUE);
               $m_c_template->estimated_picktup_date = date('Y-m-d', strtotime($this->input->post('estimated_picktup_date', TRUE)));
            // auditing purposes

            $m_c_template->save();
            $cake_template_id = $m_c_template->last_insert_id();
            $m_c_template->commit();
            if ($m_c_template->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Cake Template successfully added!';
                $response['row_added'] = $this->get_response_rows($cake_template_id);
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
            $m_c_template = $this->Cake_template_model;
            $cake_template_id = $this->input->post('cake_template_id', TRUE);
            $m_c_template->cake_template_name = $this->input->post('cake_template_name', TRUE);
            $m_c_template->cake_template_description = $this->input->post('cake_template_description', TRUE);
            $m_c_template->front_view = $this->input->post('front_view',false);
            $m_c_template->rear_view = $this->input->post('rear_view',false);
             $m_c_template->tbl_details = $this->input->post('tbl_details',false);
            $m_c_template->estimated_price = $this->input->post('estimated_price', TRUE);
            $m_c_template->serving_details = $this->input->post('serving_details', TRUE);
              $m_c_template->suggestion_box = $this->input->post('suggestion_box', TRUE);
            $m_c_template->customer_id = $this->input->post('customer_id', TRUE);
   $m_c_template->dedication_details = $this->input->post('dedication_details', TRUE);
            $m_c_template->status = $this->input->post('status', TRUE);
                 $m_c_template->estimated_picktup_date = date('Y-m-d', strtotime($this->input->post('estimated_picktup_date', TRUE)));


            $m_c_template->modify($cake_template_id);
            $m_c_template->commit();
            if ($m_c_template->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Cake Template successfully updated.';
                $response['row_updated'] = $this->get_response_rows($cake_template_id);
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
            $m_c_template = $this->Cake_template_model;
            $cake_template_id = $this->input->post('cake_template_id', TRUE);
            $m_c_template->begin();
            $m_c_template->is_active = 0;
            $m_c_template->is_deleted = 1;
            $m_c_template->modify($cake_template_id);
            $m_c_template->commit();
            if ($m_c_template->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Cake Template successfully deleted.';
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
            $directory = 'assets/images/cake_template/';
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
        $m_c_template = $this->Cake_template_model;
        return $m_c_template->get_list('cake_templates.is_active=TRUE AND cake_templates.is_deleted=FALSE ' . ($id == null ? '' : ' AND cake_templates.cake_template_id=' . $id) , array(
            'cake_templates.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'cake_templates.customer_id=c.customer_id',
                'left'
            )
        ));
        }


        public function assess(){

         
            $m_c_template = $this->Cake_template_model;
            $cake_template_id = $this->input->post('cake_template_id', TRUE);
               $m_c_template->begin();
            $m_c_template->actual_price = $this->input->post('actual_price', TRUE);
            $m_c_template->status = $this->input->post('status', TRUE);
            $m_c_template->modify($cake_template_id);
            $m_c_template->commit();




       if ($m_c_template->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Cake Template successfully updated.';
                $response['row_updated'] = $this->get_response_rows($cake_template_id);
                }
              else
                {
                $response['title'] = 'Error!';
                $response['stat'] = 'error';
                $response['msg'] = 'Something went wrong! Please try again.';
                }

            $this->json_output(json_encode($response));


        }




        public function ready_to_assess(){

         $m_c_template = $this->Cake_template_model;
             $response['data'] =  $m_c_template->get_list('cake_templates.is_active=TRUE AND cake_templates.is_deleted=FALSE ' , array(
            'cake_templates.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ) , array(
            array(
                'customers as c',
                'cake_templates.customer_id=c.customer_id',
                'left'
            )
        ));

                $this->json_output(json_encode($response));
        }



         
    public function get_verified_templates($cust_id=null)
    {
        
        
       $m_c_template = $this->Cake_template_model;
        $response['data'] = $m_c_template->get_list('cake_templates.is_active=TRUE AND cake_templates.is_deleted=FALSE AND cake_templates.status="verified" AND ' . ($cust_id == null ? '' : 'cake_templates.customer_id=' . $cust_id), array(
            'cake_templates.*',
            'c.*',
            'DATE_FORMAT(c.cust_bdate,"%m/%d/%Y")as cust_bdate',
            'CONCAT_WS(" ",c.cust_fname,c.cust_mname,c.cust_lname) as cust_fullname'
        ), array(
            array(
                 'customers as c',
                'cake_templates.customer_id=c.customer_id',
                'left'
            )
        ));
        
        
        $this->json_output(json_encode($response));
        
    }
    



    }
