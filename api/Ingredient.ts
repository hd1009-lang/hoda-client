import { IngredientDetail, IngredientModel, ResponseApis } from './../Type/IngredientType';
import axiosClient from './axiosClient';
const IngredientApis = {
    getCate: async (): Promise<ResponseApis<IngredientModel>> => {
        try {
            const url = `/api/ingredients/cate-ingredient`;
            const result = await axiosClient.get(url);
            return result.data;
        } catch (error) {
            throw error;
        }
    },
    getIngredientWithCate: async (idCate: string): Promise<ResponseApis<IngredientDetail>> => {
        try {
            const url = `/api/ingredients/cate/${idCate}`;
            const result = await axiosClient.get(url);
            return result.data;
        } catch (error) {
            throw error;
        }
    },
};
export default IngredientApis;
