<?php

namespace App\Router;
require "../../vendor/autoload.php";

use App\Controller\EnderecoController;

$endereco = new EnderecoController();
// $autorizado = new AutorizadoController();
// $autorizado->autorizado();

$body = json_decode(file_get_contents('php://input'), true);
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
        $resultado = $endereco->insert($body);
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['id'])){
            $resultado = $endereco->select();
            echo json_encode(["enderecos" => $resultado]);
        }else{
            $resultado = $endereco->selectId($id);
            echo json_encode(["status" => true, "endereco" => $resultado[0]]);
        }
       
    break;
    case "PUT";
        $resultado = $endereco->update($body,intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;
    case "DELETE";
        $resultado = $endereco->delete(intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;  
}