import { NotificationReducer, NotificationModel } from './Notiofication.reducer';
import { LoginReducer, LoginStateModel } from './auth.reducer';
import { combineReducers } from 'redux';

export interface RootState {
    auth: LoginStateModel;
    notifications: NotificationModel;
}

const rootReducer = combineReducers({
    auth: LoginReducer,
    notifications: NotificationReducer,
});

export default rootReducer;
