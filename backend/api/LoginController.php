<?php

    class LoginController{
        function getDataLogin(){
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: x-xsrf-token');
            header('Content-Type: application/json');
        
            require('./LoginModel.php');
            $dbConfig = Array(
                'host' => 'localhost',
                'user' => 'root',
                'pass' => '',
                'db' => 'bbplkbandung'
            );
        
            // $username = isset($_POST['username']) ? $_POST['username'] : null;
            // $password = isset($_POST['password']) ? $_POST['password'] : null;
        
            // $data['username'] = $username;
            // $data['password'] = $password;
             $data = json_decode(file_get_contents('php://input'), true);
             $username = $data['username'];
             $password = $data['password'];

             //print_r(json_encode($data));
             $tes = new LoginModel($dbConfig);
             echo $tes->getLogin($username, $password);
        }
    }
    
    $tes = new LoginController();
    $tes->getDataLogin();
    
?>