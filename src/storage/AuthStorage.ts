const AUTH_TOKEN_STORAGE_KEY = "authorization";
const USER_DATA = "user";
export function getToken() {

    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setToken(token: string) {
    return localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function setUser(id: string){
    return localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, id);
}

export function getUser(){
    return localStorage.getItem(USER_DATA);
}