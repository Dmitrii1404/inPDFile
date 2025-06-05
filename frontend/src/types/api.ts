// Обычный ответ
export interface response {
    message: string,
    user_id?: number,
    access_token?: string,
}

// Ответ с информацией о пользователе
export interface responseUser {
    id: number,
    email: string,
    hashed_password: string,
    is_verified: boolean,
    registration_date: string,
    last_login_date: string,
    is_active: boolean,
    is_superuser: boolean,
}

// Ответ с информацией о файлах
export interface responseHistory {
    file_name: string,
    file_size: string,
    file_path: string,
    status: string,
    classification: string,
    document_type: string,
    upload_date: string,
    has_signature: string,
    has_stamp: string,
}