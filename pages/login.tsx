import React, { useEffect } from 'react';
import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, Heading } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/Actions/Auth.action';
import { AuthModel } from '../Type/AuthType';
import Router from 'next/router';
import { RootState } from '../redux/Reducers';
import { NextPage } from 'next';
const LoginPage:NextPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        if (token) {
            Router.push('/');
        }
    }, [dispatch, token]);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<AuthModel>();

    const onLogin: SubmitHandler<AuthModel> = async (data) => {
        dispatch(LoginAction(data));
    };

    return (
        <Flex
            width={'100%'}
            height={'100vh'}
            flex="flex"
            justifyContent={'center'}
            alignItems={['center', 'flex-start']}
        >
            <Box width={['250px', '300px']} mt={[0, '10%']}>
                <Heading textAlign="center">Login</Heading>
                <form onSubmit={handleSubmit(onLogin)}>
                    <FormControl isInvalid={Boolean(errors.username)}>
                        <FormLabel htmlFor="name">Username</FormLabel>
                        <Input
                            id="username"
                            placeholder="Your username"
                            {...register('username', { required: 'Please enter your username' })}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.password)}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type={'password'}
                            id="password"
                            placeholder="Your password"
                            {...register('password', { required: 'Please enter your password' })}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Button mt={4} bg="lightGray" isLoading={isSubmitting} type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Flex>
    );
};

export default LoginPage;
