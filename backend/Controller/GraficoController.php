<?php

namespace App\Controller;

use App\Model\Model;

class GraficoController {

    private $db;

    public function __construct() {
        $this->db = new Model();
    }

    public function select(){
        $produto = $this->db->select('usuarioproduto');
        return  $produto;
    }

    public function selectId($id){
        $produto = $this->db->select('usuarioproduto', ['id' => $id]);
        return  $produto;
    }

    public function insert($data){
        if($this->db->insert('usuarioproduto', $data)){
            return true;
        }
        return false;
    }

    public function update($newData, $condition){
        if($this->db->update('usuarioproduto', $newData, ['id' => $condition])){
            return true;
        }
        return false;
    }
    
    public function delete($conditions){
        if($this->db->delete('usuarioproduto', ['id' => $conditions])){
            return true;
        }
        return false;
    }
}
