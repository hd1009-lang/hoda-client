export interface IngredientModel {
    _id?: string;
    name?: string;
    key?: string;
    item?: IngredientDetail[];
}
export interface IngredientDetail {
    _id?: string;
    name?: string;
    idCate?: string;
    nutrition?: NutritionModel;
}
export interface ResponseApis<T> {
    data: T[];
}

export interface NutritionModel {
    calo: number;
    protein: number;
    fat: number;
    carb: number;
}
