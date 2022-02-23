export interface PostModel {
    _id?: string;
    title?: string;
    idCate?: string;
    ingredients?: {
        idIngredient: string;
        quantity: number;
    };
    data?: Object;
}
