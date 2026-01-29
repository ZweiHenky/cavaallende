import axios from "axios"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

const apiGeneral = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export default apiGeneral