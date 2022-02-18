import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import { AuthModel } from './../../Type/AuthType';
import AuthApis from '../../api/Auth';
import { AuthCommand } from '../Command/Auth.command';
import { NotificationCommand } from '../Command/Notification.comamnd';
import { v4 } from 'uuid';

export const LoginAction = (data: AuthModel) => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await AuthApis.login(data);
        console.log('redux login', result);

        if (result.data) {
            dispatch({ type: AuthCommand.Login, payload: result.data });
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
        console.log('redux token', result);
        if (result.token) {
            dispatch({ type: AuthCommand.SetToken, payload: result.token });
            const noti = {
                id: v4(),
                type: 'success',
                message: result.message,
            };
            dispatch({ type: NotificationCommand.ADD, payload: noti });
        }
    } catch (error) {
        const errNoti = {
            id: v4(),
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
        localStorage.setItem('isLogin', '');
    }
};

export const Register = (data: AuthModel) => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await AuthApis.register(data);
        if (result) {
            const noti = {
                id: v4(),
                type: 'success',
                message: 'Đăng ký thành công, về trang đăng nhập để đăng nhập',
            };
            dispatch({ type: NotificationCommand.ADD, payload: noti });
        }
    } catch (error) {
        const errNoti = {
            id: v4(),
            type: 'error',
            message: (error as Error).message,
        };
        dispatch({ type: NotificationCommand.ADD, payload: errNoti });
    }
};
