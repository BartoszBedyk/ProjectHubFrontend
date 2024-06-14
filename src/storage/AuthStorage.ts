const AUTH_TOKEN_STORAGE_KEY = "authorization";
export function getToken() {

    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setToken(token: string) {
    return localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}