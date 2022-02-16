import { AuthCommand } from '../Command/Auth.command';
import { ActionDispatch } from './../../Type/Redux';

export interface LoginStateModel {
    user: {};
    login: boolean;
    token: string;
}

const initialState = {
    user: {},
    login: false,
    token: '',
};

export const LoginReducer = (state: LoginStateModel = initialState, action: ActionDispatch) => {
    switch (action.type) {
        case AuthCommand.Login:
            return {
                ...state,
                user: action.payload,
                login: true,
            };
        case AuthCommand.SetToken:
            return {
                ...state,
                token: action.payload,
            };
        case AuthCommand.Logout:
            return initialState;
        default:
            return state;
    }
};
