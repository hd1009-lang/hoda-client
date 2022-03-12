import { Box, Flex, toast } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import { NotificationModel } from '../../redux/Reducers/Notiofication.reducer';
import styles from './Toast.module.css';
import ToastItem from './ToastItem';
interface ToastModel {
    notifications: NotificationModel[];
}
const Toast = () => {
    const notifications = useSelector((state: RootState) => state.notifications);

    return (
        <Box width={'100%'} position="absolute" height={'fit-content'} bg="gray.100" top={0} zIndex={'9999'}>
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
                    return <ToastItem key={index} toast={toast} />;
                })}
            </Flex>
        </Box>
    );
};

export default Toast;
