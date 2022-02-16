import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
    username: string;
    password: string;
};

const RegisterPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();
    const onLogin: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };
    return (
        <Flex width={'100%'} height={'100vh'} flex="flex" justifyContent={'center'} alignItems={'center'}>
            <Box width={['200px', '300px']}>
                <Heading>Register</Heading>
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
                    <FormControl isInvalid={Boolean(errors.password)}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type={'password'}
                            id="password"
                            placeholder="Repeat your password"
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

export default RegisterPage;
