import { ResponseCommon } from '../Type/Common';
import { RecipeModel, ResponseRecipeAfter } from './../Type/Recipe';
import axiosClient from './axiosClient';
const RecipeApis = {
    create: async (content: RecipeModel): Promise<ResponseCommon<string>> => {
        try {
            const url = '/api/recipes/create';
            return await axiosClient.post(url, content);
        } catch (error) {
            throw error;
        }
    },
    getDetailRecipe: async (id: string): Promise<ResponseCommon<ResponseRecipeAfter>> => {
        try {
            const url = `/api/recipes/${id}`;
            return await axiosClient.get(url);
        } catch (error) {
            throw error;
        }
    },
};

export default RecipeApis;
