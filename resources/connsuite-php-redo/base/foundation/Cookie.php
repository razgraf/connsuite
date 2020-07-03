<?php
/**
 * Create by @VanSoftware
 * Date: 31/05/2018
 * Time: 18:30
 */


trait Cookie{

    public static function setCookie($cookieName, $cookieValue, $cookieDuration = AUTH_COOKIE_EXPIRY_DATE ){
        setcookie($cookieName,$cookieValue,time()+$cookieDuration,'/',null,isset($_SERVER["HTTPS"]),RELEASE);

    }

    public static function unsetCookie($cookieName){
        setcookie($cookieName, '', time() - 3600, '/',null,isset($_SERVER["HTTPS"]),RELEASE);
    }
}