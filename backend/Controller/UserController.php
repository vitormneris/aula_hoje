<?php

namespace App\Controller;

use App\Model\Model;
use App\Model\Usuario;


class UserController
{
    private $db;
    private $usuarios;

    public function __construct()
    {
        $this->db = new Model();
        $this->usuarios = new Usuario();
    }

    public function select()
    {
        $user = $this->db->select('users');
        return  $user;
    }

    public function selectId($id)
    {
        $user = $this->db->select('users', ['id' => $id]);
        return  $user;
    }

    public function insert($data)
    {
        $this->usuarios->setNome($data['nome_u']);
        $this->usuarios->setEmail($data['email']);
        $this->usuarios->setSenha($data['senha']);
        if ($this->db->insert(
            'users',
            [
                'nome_u' => $this->usuarios->getNome(),
                'email' => $this->usuarios->getEmail(),
                'senha' => $this->usuarios->getSenha()
            ]
        )) {
            return true;
        }
        return false;
    }

    public function update($newData, $condition)
    {
        if ($this->db->update('users', $newData, ['id' => $condition])) {
            return true;
        }
        return false;
    }

    public function delete($conditions)
    {
        if ($this->db->delete('users', ['id' => $conditions])) {
            return true;
        }
        return false;
    }

    public function login($dados) {
        if ($this->db->select('users', ['email' => $dados['email']]) && 
            $this->db->select('users', ['senha' => $dados['senha']])) 
        {
            return true;
        } else {
            return false;
        }
    }
}
