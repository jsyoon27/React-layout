import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "content-type": "application/json",
            // Authorization은 요청 인터셉터에서 최신 토큰으로 설정
        },
        withCredentials: true,
        ...config,
    
    });
    // 매 요청마다 최신 토큰을 헤더에 실어 보낸다.
    axiosInstance.interceptors.request.use((cfg) => {
        const token = getToken();
        if (token) {
            cfg.headers = cfg.headers ?? {};
            cfg.headers.Authorization = token;
        } else if (cfg.headers?.Authorization) {
            delete cfg.headers.Authorization;
        }
        return cfg;
    });
    axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
        //로그인 만료 처리
        if (error.response.status === 401) {
            removeToken();
            window.location.href = "/login";
            return;
        }
        return Promise.reject(error);
        }
    )
        return axiosInstance;
    };

export const httpClient = createClient();

// 공통 요청 부분
type RequestMethod = "get" | "post" | "put" | "delete";


export const requestHandler = async<T>(method:RequestMethod, url:string, payload?: T) => {
    let response;
    switch (method) {
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "get":
            response = await httpClient.get(url);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
    }
    return response.data;
};