import { AuthAccessToken, AuthLogin, AuthModel } from './../Type/AuthType';
import { User } from '../Type/UserType';
import axiosClient from './axiosClient';
const AuthApis = {
    login: async (data: AuthModel): Promise<AuthLogin<User>> => {
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
            return await axiosClient.post(url, {});
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            const url = '/api/users/logout';
            return url;
        } catch (error) {
            throw error;
        }
    },
};
export default AuthApis;
