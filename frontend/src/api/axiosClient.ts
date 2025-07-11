import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// конфинурация axios
export const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})