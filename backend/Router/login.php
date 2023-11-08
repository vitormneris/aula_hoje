<?php

namespace App\Router;

require "../../vendor/autoload.php";

use App\Controller\UserController;

$users = new UserController();

// $autorizado = new AutorizadoController();
// $autorizado->autorizado();

$body = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : '';

switch ($_SERVER["REQUEST_METHOD"]) {
    case "POST";
        $resultado = $users->login($body);
        echo json_encode(['status' => $resultado]);
        break;
    case "GET";
        if (!isset($_GET['id'])) {
            $resultado = $users->select();
            echo json_encode(["usuarios" => $resultado]);
        } else {
            $resultado = $users->selectId($id);
            echo json_encode(["status" => true, "usuario" => $resultado[0]]);
        }

        break;
    case "PUT";
        $resultado = $users->update($body, intval($_GET['id']));
        echo json_encode(['status' => $resultado]);
        break;
    case "DELETE";
        $resultado = $users->delete(intval($_GET['id']));        
        echo json_encode(['status' => $resultado]);
        break;
}
