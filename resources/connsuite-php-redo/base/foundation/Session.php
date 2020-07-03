<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 15/03/2018
 * Time: 21:46
 */

require_once (__DIR__ . "/Cookie.php");

class Session{

    use Cookie;

    static public function sessionStart($name, $duration = 999999) {
        if (session_status() == PHP_SESSION_NONE) {
            ini_set('session.use_only_cookies', 1); // Forces sessions to only use cookies.
            $cookieParams = session_get_cookie_params(); // Gets current cookies params.
            session_set_cookie_params($duration, $cookieParams["path"], $cookieParams["domain"], isset($_SERVER["HTTPS"]), true);
            session_name($name); // Sets the session name to the one set above.
            session_start(); // Start the php session
        }
    }

    static public function sessionDestroy($name){
        self::unsetCookie($name);
        session_destroy();
        session_write_close();
    }

}