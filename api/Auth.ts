import { Auth, AuthAccessToken, AuthLogin, AuthModel } from './../Type/AuthType';
import { UserModel } from '../Type/UserType';
import axiosClient from './axiosClient';
const AuthApis = {
    login: async (data: AuthModel): Promise<AuthLogin<UserModel>> => {
        try {
            const url = '/api/users/login';
            return await axiosClient.post(url, data);
        } catch (error) {
            throw error;
        }
    },
    getAccessToken: async (): Promise<AuthAccessToken> => {
        try {

            const url = '/api/users/refresh_token';
            return await axiosClient.get(url);
        } catch (error) {

            throw error;
        }
    },
    logout: async () => {
        try {
            const url = '/api/users/logout';
            axiosClient.get(url);
            localStorage.setItem('isLogin', '');
        } catch (error) {
            throw error;
        }
    },
    register: async (data: AuthModel): Promise<Auth> => {
        try {
            const url = '/api/users/register';
            return await axiosClient.post(url, data);
        } catch (error) {
            throw error;
        }
    },
};
export default AuthApis;
