import { RecipeModel } from './../../Type/Recipe';
import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import IngredientApis from '../../api/Ingredient';
import { v4 } from 'uuid';
import { NotificationCommand } from '../Command/Notification.comamnd';
import RecipeApis from '../../api/Recipe';
export const CreateRecipeAction =
    (data: RecipeModel) =>
    async (dispatch: Dispatch<ActionDispatch>): Promise<string | boolean> => {
        try {
            const result = await RecipeApis.create(data);
            if (result.data) {
                dispatch({ type: NotificationCommand.ADD, payload: 'Thành công' });
                return result.data;
            }
            return false;
        } catch (error) {
            const errNoti = {
                id: v4(),
                type: 'error',
                message: (error as Error).message,
            };
            dispatch({ type: NotificationCommand.ADD, payload: errNoti });
            return false;
        }
    };
export const UpdateRecipeAction =
    (data: RecipeModel) =>
    async (dispatch: Dispatch<ActionDispatch>): Promise<string | boolean> => {
        try {
            const result = await RecipeApis.update(data);
            if (result.data) {
                dispatch({ type: NotificationCommand.ADD, payload: 'Thành công' });
                return result.data;
            }
            return false;
        } catch (error) {
            const errNoti = {
                id: v4(),
                type: 'error',
                message: (error as Error).message,
            };
            dispatch({ type: NotificationCommand.ADD, payload: errNoti });
            return false;
        }
    };
