<?php
namespace App\Model;

class Produto {
    private $id;
    private $idUsuario;
    private $idProduto;
    private $criado;

    public function __construct() {
      
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getIdProduto() {
        return $this->idProduto;
    }

    public function setIdProduto($idProduto) {
        $this->idProduto = $idProduto;
    }

    public function getCriado() {
        return $this->criado;
    }

    public function setCriado($criado) {
        $this->criado = $criado;
    }
}
