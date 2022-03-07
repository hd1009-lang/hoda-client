import { NutritionModel } from './IngredientType';
export interface RecipeModel {
    _id?: string;
    title?: string;
    idCate?: string;
    img?: string;
    ingredients?: {
        idIngredient: string;
        quantity: number;
    }[];
    data?: StepModel[];
    totalRecipe?: NutritionModel;
}

export interface StepModel {
    content: string;
    img?: string[];
}

// Chi tiết ingredient sau khi được server xử lý
export interface ResponseRecipeIngredientHandled {
    idCate: string;
    name: string;
    nameCate: string;
    nutrition: {
        calo: number;
        protein: number;
        fat: number;
        carb: number;
    };
    quantity: number;
    _id: string;
}
//Recipe từ server trả về
export interface ResponseRecipeAfter {
    _id?: string;
    title: string;
    idCate?: string;
    idUser: {};
    img: string;
    ingredients: ResponseRecipeIngredientHandled[];
    data: StepModel[];
    totalRecipe: NutritionModel;
}

//List Recipe được trả về
export interface ResponseListRecipe extends RecipeModel {}
