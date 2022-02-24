import React, { useEffect } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { NotificationModel } from '../../redux/Reducers/Notiofication.reducer';
import { useDispatch } from 'react-redux';
import { NotificationCommand } from '../../redux/Command/Notification.comamnd';
interface ToastItemModel {
    toast: NotificationModel;
}

const ToastItem = ({ toast }: ToastItemModel) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const removeToast = setInterval(() => {
            dispatch({ type: NotificationCommand.REMOVE, payload: toast });
        }, 1000);
        return () => window.clearInterval(removeToast);
    }, [dispatch, toast]);
    return (
        <Alert status={`${toast.type === 'error' ? 'error' : 'success'}`}>
            <AlertIcon />
            {toast.message}
        </Alert>
    );
};

export default ToastItem;
