import { ActionDispatch } from './../../Type/Redux';
import { Dispatch } from 'react';
import { BmiModel } from './../../components/Bmi/data';
import UserApis from '../../api/User';
import { GetInfo } from './Auth.action';
import { NotificationCommand } from '../Command/Notification.comamnd';
import { v4 } from 'uuid';
export const UpdateBmi = (data: BmiModel) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await UserApis.updateBmi(data);
        if (result.data.bmi) {
            dispatch(GetInfo());
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
