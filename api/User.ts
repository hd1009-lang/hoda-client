import { UserModel } from './../Type/UserType';
import { BmiModel } from '../components/Bmi/data';
import axiosClient from './axiosClient';
import { AuthLogin } from '../Type/AuthType';

const UserApis = {
    updateBmi: async (data: BmiModel): Promise<AuthLogin<BmiModel>> => {
        try {
            const url = '/api/users/update-bmi';
            return await axiosClient.post(url, data);
        } catch (error) {
            throw error;
        }
    },
    getInfoUser: async (): Promise<AuthLogin<UserModel>> => {
        try {
            const url = '/api/users/info';
            return await axiosClient.get(url);
        } catch (error) {
            throw error;
        }
    },
    
};
export default UserApis;
