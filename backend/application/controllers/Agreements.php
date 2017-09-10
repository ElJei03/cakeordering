
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Agreements extends CORE_Controller

    {
    function __construct()
        {
        parent::__construct('');
        $this->load->model(array(
            'Agreement_model'
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
            $m_agreement = $this->Agreement_model;
            $is_set = $this->input->post('is_set');
            $m_agreement->begin();

            // auditing purposes

            if ($is_set == "yes")
                {
                $m_agreement->is_set = "no";
                $m_agreement->modify_all();
                $m_agreement->agreement_message = $this->input->post('agreement_message', TRUE);
                $m_agreement->is_set = $this->input->post('is_set', TRUE);
                $m_agreement->save();
                $agreement_id = $m_agreement->last_insert_id();
                }
              else
                {
                $m_agreement->agreement_message = $this->input->post('agreement_message', TRUE);
                $m_agreement->is_set = $this->input->post('is_set', TRUE);
                $m_agreement->save();
                }

            $m_agreement->commit();
            if ($m_agreement->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Agreement successfully added!';
                $response['row_added'] = $this->get_response_rows($agreement_id);
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
            $m_agreement = $this->Agreement_model;
            $agreement_id = $this->input->post('agreement_id', TRUE);
            $m_agreement->agreement_message = $this->input->post('agreement_message',false);
            $m_agreement->is_set = $this->input->post('is_set', TRUE);
            $m_agreement->modify($agreement_id);
            $m_agreement->commit();
            if ($m_agreement->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Agreement successfully updated.';
                $response['row_updated'] = $this->get_response_rows($agreement_id);
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
            $m_agreement = $this->Agreement_model;
            $agreement_id = $this->input->post('agreement_id', TRUE);
            $m_agreement->begin();
            $m_agreement->is_active = 0;
            $m_agreement->is_deleted = 1;
            $m_agreement->modify($agreement_id);
            $m_agreement->commit();
            if ($m_agreement->status() === TRUE)
                {
                $response['title'] = 'Success!';
                $response['stat'] = 'success';
                $response['msg'] = 'Agreement  successfully deleted.';
                }
              else
                {
                $response['title'] = 'Error!';
                $response['stat'] = 'error';
                $response['msg'] = 'Something went wrong. Please try again later.';
                }

            $this->json_output(json_encode($response));
            break;
            }
        }

    private
    function get_response_rows($id = null)
        {
        $m_agreement = $this->Agreement_model;
        return $m_agreement->get_list(

        // send the parameter for filtering

        'agreements.is_active=1 AND agreements.is_deleted=0' . ($id == null ? '' : ' AND agreements.agreement_id=' . $id) ,

        // send array parameter for fields required

        array(
            'agreements.*'
        ));
        }
    }

