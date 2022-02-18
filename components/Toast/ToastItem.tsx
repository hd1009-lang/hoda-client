import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
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
    }, [dispatch]);
    return (
        <Box bg={`${toast.type === 'error' ? 'lightError' : 'lightSuccess'}`} padding={'5px 10px'}>
            {toast.message}
        </Box>
    );
};

export default ToastItem;
