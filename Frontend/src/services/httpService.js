import axios from "axios";

export const httpService = axios.create({
    baseURL: 'https://mario2205-001-site1.gtempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json; charset=utf-8, access-control-allow-origin'
    }
});