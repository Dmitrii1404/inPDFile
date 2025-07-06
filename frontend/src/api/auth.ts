import { axiosClient } from "./axiosClient.ts";
import type { response, responseUser } from "../types";


// API - получение информации о пользователе
export function meAPI() {
    return axiosClient.get<responseUser>('/auth/me');
}

// API - вход в аккаунт
export function loginAPI(email: string, password: string) {
    return axiosClient.post<response>('/auth/login', {
        email,
        password,
    });
}

// API - регистрация аккаунта
export function registerAPI(email: string, password: string) {
    return axiosClient.post<response>('/auth/register', {
        email,
        password,
    });
}

// API - подтвердение кода при регистрации
export function confirmAPI(code: string) {
    return axiosClient.put<response>(`auth/confirm?code=${code}`);
}

// API - удаление аккаунта
export function deleteAPI() {
    return axiosClient.delete<response>('auth/delete');
}

// API - выход из аккаунта
export function logoutAPI() {
    return axiosClient.post<response>('/auth/logout');
}