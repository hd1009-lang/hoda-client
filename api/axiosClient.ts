import axios, { AxiosResponse } from 'axios';
import { store } from '../redux/store';
const axiosClient = axios.create({
    baseURL: process.env.NEXTAUTH_URL as string,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor


axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = store.getState().auth.token || '';
        config.headers={
            Authorization:token
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;
