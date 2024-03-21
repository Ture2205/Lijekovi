import axios from "axios";

export const httpService = axios.create({
    baseURL: 'https://mario2205-001-site1.ftempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});