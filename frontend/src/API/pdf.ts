import { axiosClient } from "./axiosClient.ts";
import type { responseHistory } from "../types";
import NProgress from "nprogress";


// API - получение истории отправок файлов
export function historyAPI() {
    return axiosClient.get<responseHistory[]>('/pdf/history');
}

// API - отправка файла для анализа
export function analyzeAPI(formData: FormData) {
    return axiosClient.post<Blob>('/pdf/analyze', formData, {
        onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100;
            NProgress.set(percentage);
        },
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
    });
}