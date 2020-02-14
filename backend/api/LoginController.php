<?php
    class LoginController{
        function getDataLogin(){
            //$IS_PRODUCTION = ($_SERVER['SERVER_ADDR'] != '127.0.0.1');
            $IS_PRODUCTION = ($_SERVER['SERVER_ADDR'] == 'localhost');
            
            $API_URL = ($IS_PRODUCTION) ? 'https://sertifikat.bbplkbandung.com' : 'http://localhost:3000';
            $HOST = ($IS_PRODUCTION) ? 'localhost' : 'localhost';
            $USER = ($IS_PRODUCTION) ? 'bbplkban_admin' : 'root';
            $PASS = ($IS_PRODUCTION) ? 'bbplkbandung' : '';
            $DB = ($IS_PRODUCTION) ? 'bbplkban_sertifikat' : 'bbplkbandung';
        
            header('Access-Control-Allow-Origin:' . $API_URL);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: x-xsrf-token');
            header('Content-Type: application/json');
        
            require('./LoginModel.php');
            $dbConfig = Array(
                'host' => $HOST,
                'user' => $USER,
                'pass' => $PASS,
                'db' => $DB
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