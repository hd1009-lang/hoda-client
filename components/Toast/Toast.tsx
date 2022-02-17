import { Box, Flex, toast } from '@chakra-ui/react';
import React from 'react';
import { NotificationModel } from '../../redux/Reducers/Notiofication.reducer';
import styles from './Toast.module.css';
interface ToastModel {
    notifications: NotificationModel[];
}
const Toast = ({ notifications }: ToastModel) => {
    const toasts = [
        { type: 'error', message: 'Vui lòng đăng nhập' },
        { type: 'success', message: 'Thành công' },
        { type: 'error', message: 'Không đúng định dạng' },
    ];
    return (
        <Flex
            direction={'column-reverse'}
            justifyContent="flex-end"
            alignItems={'center'}
            width="fit-content"
            height="fit-content"
            padding={'5px 10px'}
            position="absolute"
            top={0}
            left={'50%'}
            gap={'10px 0'}
            className={styles.box}
        >
            {notifications.map((toast, index) => {
                return (
                    <Box
                        key={index}
                        bg={`${toast.type === 'error' ? 'lightError' : 'lightSuccess'}`}
                        padding={'5px 10px'}
                    >
                        {toast.message}
                    </Box>
                );
            })}
        </Flex>
    );
};

export default Toast;
