import React, { useEffect, useState } from 'react';
import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import { GetAccessToken } from '../../redux/Actions/Auth.action';
import AuthApis from '../../api/Auth';
import { AuthCommand } from '../../redux/Command/Auth.command';
import Toast from '../Toast/Toast';
import Navigation from '../Navigation/Navigation';
import axios from 'axios';
import axiosClient from '../../api/axiosClient';
interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    const dispatch = useDispatch();
    const { login, token } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin');
        if (isLogin) {
            dispatch(GetAccessToken());
        }
    }, [dispatch]);
    useEffect(() => {
        if (login) {
            setLoading(true);
            dispatch(GetAccessToken());
            setLoading(false);
        }
    }, [dispatch, login]);

    const onLogout = () => {
        AuthApis.logout();
        localStorage.setItem('isLogin', '');
        dispatch({ type: AuthCommand.Logout });
    };
    if (loading) {
        return (
            <Box width={'500px'} height={'500px'}>
                Loading.....
            </Box>
        );
    }
    return (
        <Box width="100%" height="100vh" overflow="hidden" bg={'pink.100'} position="relative">
            <Navigation token={token} onLogout={onLogout} />
            <Box width={'100%'} position="relative" bg="red.100">
                {children}
                <Toast />
            </Box>
        </Box>
    );
};

export default Layout;
