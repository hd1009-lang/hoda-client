import { ResponseCommon } from '../Type/Common';
import axiosClient from './axiosClient';

const ServiceApis = {
    uploadImg: async (file: File): Promise<ResponseCommon<string>> => {
        try {
            const url = '/api/services/upload-img';
            let formData = new FormData();
            formData.append('file', file);
            return await axiosClient.post(url, formData);
        } catch (error) {
            throw error;
        }
    },
};

export default ServiceApis;
