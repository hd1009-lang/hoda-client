import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import { AuthModel } from './../../Type/AuthType';
import AuthApis from '../../api/Auth';
import { AuthCommand } from '../Command/Auth.command';
import { NotificationCommand } from '../Command/Notification.comamnd';
import { v4 } from 'uuid';
import UserApis from '../../api/User';
import Cookie from 'js-cookie';
import { UserCommand } from '../Command/User.command';
export const LoginAction = (data: AuthModel) => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await AuthApis.login(data);
        if (result.data) {
            dispatch({ type: AuthCommand.Login, payload: result.data });
            localStorage.setItem('isLogin', 'true');

            Cookie.set('refresh_token', result.token!, {
                sameSite: 'none',
                secure: true,
                path: 'api/users/refresh_token',
                expires: 7,
            });
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
        // const data = await UserApis.getInfoUser(result.token);
        if (result.token) {
            dispatch({ type: AuthCommand.SetToken, payload: result.token });
            // dispatch({ type: UserCommand.GET_INFO, payload: data.data });
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
                message: '????ng k?? th??nh c??ng, v??? trang ????ng nh???p ????? ????ng nh???p',
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
export const GetInfo = () => async (dispatch: Dispatch<ActionDispatch>) => {
    try {
        const result = await UserApis.getInfoUser();

        if (result.data.username) {
            dispatch({ type: UserCommand.GET_INFO, payload: result.data });
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
