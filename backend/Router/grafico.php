<?php

namespace App\Router;
require "../../vendor/autoload.php";

use App\Controller\GraficoController;

$produtos = new GraficoController();
// $autorizado = new AutorizadoController();
// $autorizado->autorizado();

$body = json_decode(file_get_contents('php://input'), true);
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
        $resultado = $produtos->insert($body);
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['id'])){
            $resultado = $produtos->select();
            echo json_encode(["grafico" => $resultado]);
        }else{
            $resultado = $produtos->selectId($id);
            echo json_encode(["status" => true, "produto" => $resultado[0]]);
        }
       
    break;
    case "PUT";
        $resultado = $produtos->update($body,intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;
    case "DELETE";
        $resultado = $produtos->delete(intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;  
}