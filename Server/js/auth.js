var isAuthenticated = function ($cookieStore) {
    return ($cookieStore.get("logindata") != null);
}

var getLogin = function($cookieStore){
    return $cookieStore.get("logindata");
}

var login = function ($cookieStore, logindata) {
    if (logindata != null) {
        $cookieStore.put('logindata', logindata);
        return "OK";
    } else {
        return "Password or Username is invalid.";
    }
}

var logout = function ($cookieStore) {
    $cookieStore.remove("logindata");
}
