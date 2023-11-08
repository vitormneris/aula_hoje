<?php

namespace App\Controller;

use App\Model\Model;

class VendaController {

    private $db;

    public function __construct() {
        $this->db = new Model();
    }

    public function select(){
        $venda = $this->db->select('venda');
        return  $venda;
    }

    public function selectId($id){
        $venda = $this->db->select('venda', ['id' => $id]);
        return  $venda;
    }

    public function insert($data){
        if($this->db->insert('venda', $data)){
            return true;
        }
        return false;
    }

    public function update($newData, $condition){
        if($this->db->update('venda', $newData, ['id' => $condition])){
            return true;
        }
        return false;
    }
    
    public function delete($conditions){
        if($this->db->delete('venda', ['id' => $conditions])){
            return true;
        }
        return false;
    }
}
