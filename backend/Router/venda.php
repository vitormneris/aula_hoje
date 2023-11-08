<?php

namespace App\Router;
require "../../vendor/autoload.php";

use App\Controller\VendaController;

$venda = new VendaController();
//$autorizado = new AutorizadoController();
//$autorizado->autorizado();

$body = json_decode(file_get_contents('php://input'), true);
$id=isset($_GET['id'])?$_GET['id']:'';
switch($_SERVER["REQUEST_METHOD"]){
    case "POST";
        $resultado = $venda->insert($body);
        echo json_encode(['status'=>$resultado]);
    break;
    case "GET";
        if(!isset($_GET['id'])){
            $resultado = $venda->select();
            echo json_encode(["vendas" => $resultado]);
        }else{
            $resultado = $produtos->selectId($id);
            echo json_encode(["status" => true, "venda" => $resultado[0]]);
        }
       
    break;
    case "PUT";
        $resultado = $venda->update($body,intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;
    case "DELETE";
        $resultado = $venda->delete(intval($_GET['id']));
        echo json_encode(['status'=>$resultado]);
    break;  
}