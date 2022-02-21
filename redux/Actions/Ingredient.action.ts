import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import IngredientApis from '../../api/Ingredient';
import { v4 } from 'uuid';
import { NotificationCommand } from '../Command/Notification.comamnd';
import { IngredientCommand } from '../Command/Ingredient.command';
export const GetCateIngredient = () => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await IngredientApis.getCate();
        dispatch({ type: IngredientCommand.GET_CATE, payload: result });
    } catch (error) {
        const errNoti = {
            id: v4(),
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
    }
};
export const GetIngredientWithCate = (idCate: string) => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await IngredientApis.getIngredientWithCate(idCate);
        dispatch({ type: IngredientCommand.GET_INGREDIENT_WITH_CATE, payload: { id: idCate, data: result } });
    } catch (error) {
        const errNoti = {
            id: v4(),
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
    }
};
