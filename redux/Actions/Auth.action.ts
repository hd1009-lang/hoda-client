import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import { AuthModel } from './../../Type/AuthType';
import AuthApis from '../../api/Auth';
import { AuthCommand } from '../Command/Auth.command';
import { NotificationCommand } from '../Command/Notification.comamnd';
export const LoginAction = (data: AuthModel) => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await AuthApis.login(data);
        console.log(result);

        if (result.data) {
            dispatch({ type: AuthCommand.Login, payload: result.data });
            const noti = {
                type: 'success',
                message: result.message,
            };
            dispatch({ type: NotificationCommand.ADD, payload: noti });
            localStorage.setItem('isLogin', 'true');
        }
    } catch (error) {
        const errNoti = {
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
    }
};

export const GetAccessToken = () => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await AuthApis.getAccessToken();
        console.log(result);
        if (result.token) {
            dispatch({ type: AuthCommand.SetToken, payload: result.token });
            const noti = {
                type: 'success',
                message: result.message,
            };
            dispatch({ type: NotificationCommand.ADD, payload: noti });
        }
    } catch (error) {
        console.log(error);

        const errNoti = {
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
        localStorage.setItem('isLogin', '');
    }
};
