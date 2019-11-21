<?php
    class LoginModel {
        public $connect;

        function __construct($config){
            $this->connect = mysqli_connect($config['host'], $config['user'], $config['pass'], $config['db']);
        }

        function getLogin ($username, $password, $internal= false) {
            if($username==null || $password==null){
                return json_encode(array('message' => 'Username atau Password Tidak Boleh Kosong'));
            }else{
                $query = mysqli_query($this->connect, "SELECT * FROM login WHERE username='$username' AND password='$password'");
                $data = mysqli_fetch_assoc($query);
                if($internal) {
                    return $data;
                }else{
                    if(!is_null($data))
                    {
                        $token = md5($data['username'] . time() . 'bbplkbandungsecret');
                        $query = mysqli_query($this->connect, "UPDATE login SET session_id=\"$token\" WHERE id=\"$data[id]\"");                
                        return json_encode(array('token' => $token));
                    }else{
                        return json_encode(array('message' => 'Username dan Password Tidak Ditemukan'));
                    }
                }
            }
        }

    }
?>
