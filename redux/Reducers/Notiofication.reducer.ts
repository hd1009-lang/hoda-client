import { NotificationCommand } from '../Command/Notification.comamnd';
import { ActionDispatch } from '../../Type/Redux';

export interface NotificationModel {
    id: string;
    type: string;
    message: string;
}

interface actionNotification extends ActionDispatch {
    payload: NotificationModel;
}
export const NotificationReducer = (state: NotificationModel[] = [], action: actionNotification) => {
    switch (action.type) {
        case NotificationCommand.ADD:
            return [...state, action.payload];
        case NotificationCommand.REMOVE:
            const newNoti = state.filter((el) => el.id !== action.payload.id);
            return newNoti;
        default:
            return state;
    }
};
