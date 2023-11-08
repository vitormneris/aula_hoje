<?php
namespace App\Model;

class Produto {
    private $usuario;
    private $produto;

    public function __construct() {
      
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getProduto() {
        return $this->produto;
    }

    public function setProduto($produto) {
        $this->produto = $produto;
    }
}
