import { Item } from 'framer-motion/types/components/Reorder/Item';
import { IngredientModel } from '../../Type/IngredientType';
import { ActionDispatch } from '../../Type/Redux';
import { IngredientCommand } from '../Command/Ingredient.command';

const initialState = {
    _id: '',
    name: '',
    key: '',
};
export const IngredientReducer = (state: IngredientModel[] = [initialState], action: ActionDispatch) => {
    switch (action.type) {
        case IngredientCommand.GET_CATE:
            return action.payload;
        case IngredientCommand.GET_INGREDIENT_WITH_CATE:
            const newData = state.map((el) => {
                if (el._id === action.payload.id) {
                    return { ...el, item: action.payload.data };
                }
                return el;
            });

            return newData;
        default:
            return state;
    }
};
