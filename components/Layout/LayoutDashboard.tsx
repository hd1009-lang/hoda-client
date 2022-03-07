import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import NotFound from '../404/404';
interface LayoutDashboardProps {
    children: React.ReactNode;
}
const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
    const token = useSelector((state: RootState) => state.auth.token);
    if (!token) {
        return <NotFound />;
    }
    return (
        <Box width={'100%'} height="100%">
            {children}
        </Box>
    );
};

export default LayoutDashboard;
