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
}

export interface StepModel {
    content: string;
    img?: string[];
}

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
export interface ResponseRecipeAfter {
    _id?: string;
    title?: string;
    idCate?: string;
    idUser?: {};
    img?: string;
    ingredients?: ResponseRecipeIngredientHandled[];
    data?: StepModel[];
}
