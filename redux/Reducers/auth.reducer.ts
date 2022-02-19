import { BmiModel } from '../../components/Bmi/data';
import { AuthCommand } from '../Command/Auth.command';
import { UserCommand } from '../Command/User.command';
import { ActionDispatch } from './../../Type/Redux';

export interface LoginStateModel {
    user: {
        username: string;
        name: string;
        post: object[];
        bmiId: BmiModel;
    };
    login: boolean;
    token: string;
}

const initialState = {
    user: {
        username: 'non',
        name: 'non',
        post: [],
        bmiId: {},
    },
    login: false,
    token: '',
};

export const LoginReducer = (state: LoginStateModel = initialState, action: ActionDispatch) => {
    switch (action.type) {
        case AuthCommand.Login:
            return {
                ...state,
                login: true,
            };
        case AuthCommand.SetToken:
            return {
                ...state,
                token: action.payload,
            };
        case AuthCommand.Logout:
            return initialState;
        case UserCommand.GET_INFO:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
