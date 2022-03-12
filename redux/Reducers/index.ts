import { CacheReducer } from './cache.reducer';
import { NotificationReducer, NotificationModel } from './Notiofication.reducer';
import { LoginReducer, LoginStateModel } from './auth.reducer';
import { combineReducers } from 'redux';
import { IngredientReducer } from './ingredient.reducer';
import { IngredientModel } from '../../Type/IngredientType';

export interface RootState {
    auth: LoginStateModel;
    notifications: NotificationModel[];
    ingredients: IngredientModel[];
    cache: {};
}

const rootReducer = combineReducers({
    auth: LoginReducer,
    notifications: NotificationReducer,
    ingredients: IngredientReducer,
    cache: CacheReducer,
});

export default rootReducer;
