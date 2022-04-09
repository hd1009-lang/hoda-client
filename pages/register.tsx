import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Button, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Register } from '../redux/Actions/Auth.action';
import Helper from '../utils/Regex';

type FormValues = {
    name: string;
    username: string;
    password: string;
    re_password: string;
};

const RegisterPage: NextPage = () => {
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
        watch,
        getValues,
        setValue,
        reset,
    } = useForm<FormValues>();
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false);

    const onRegister: SubmitHandler<FormValues> = (data) => {
        const { name, username, password } = data;
        const content = {
            name,
            username,
            password,
        };
        dispatch(Register(content));
        reset();
    };
    return (
        <Flex width={'100%'} height={'100vh'} flex="flex" justifyContent={'center'} alignItems={'center'}>
            <Box width={['250px', '400px']}>
                <Heading>Register</Heading>
                <form onSubmit={handleSubmit(onRegister)}>
                    <FormControl isInvalid={Boolean(errors.username)}>
                        <FormLabel htmlFor="name">Tên</FormLabel>
                        <Input
                            id="name"
                            placeholder="Có thể gọi bạn là"
                            {...register('name', {
                                required: 'Vui lòng nhập tên của bạn',
                            })}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.username)}>
                        <FormLabel htmlFor="name">Tên tài khoản</FormLabel>
                        <Input
                            id="username"
                            placeholder="Tên tài khoản của bạn"
                            {...register('username', {
                                required: 'Vui lòng nhập tên tài khoản',
                                pattern: { value: /^\S+$/g, message: 'Không chưa khoảng trắng' },
                                minLength: { value: 5, message: 'Không dưới 5 ký tự' },
                                validate: {
                                    vietnamese: (value) =>
                                        (value && Helper.checkVietnamese(value)) || 'Vui lòng không gõ dấu',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.password)}>
                        <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                        <Input
                            type={`${show ? 'text' : 'password'}`}
                            id="password"
                            placeholder="Mật khẩu của bạn"
                            {...register('password', {
                                required: 'Vui lòng nhập mật khẩu',
                                minLength: { value: 8, message: 'Mật khẩu ít nhất 8 kí tự' },
                                pattern: { value: /^\S+$/g, message: 'Không chưa khoảng trắng' },
                                validate: {
                                    digit: (value) => (value && /(?=(.*[\d]){2})/g.test(value)) || 'Ít nhất 2 ký tự số',
                                    uppercase: (value) =>
                                        (value && /(?=(.*[A-Z]){2})/g.test(value)) || 'Ít nhất 2 ký tự viết hoa',
                                    special: (value) =>
                                        (value && /(?=(.*[\W]){2})/g.test(value)) || 'Ít nhất 2 ký tự đặc biệt',
                                    vietnamese: (value) =>
                                        (value && Helper.checkVietnamese(value)) || 'Vui lòng không gõ dấu',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.re_password)}>
                        <FormLabel htmlFor="re_password">Nhập lại mật khẩu</FormLabel>
                        <Input
                            type={`${show ? 'text' : 'password'}`}
                            id="re_password"
                            placeholder="Nhập lại mật khẩu của bạn"
                            {...register('re_password', {
                                required: 'Vui lòng nhập mật khẩu',
                                validate: (value) => value === getValues('password'),
                            })}
                        />
                        <FormErrorMessage>
                            {errors.re_password && errors.re_password.message}
                            {errors.re_password &&
                                errors.re_password.type === 'validate' &&
                                'Mật khẩu nhập lại không trùng'}
                        </FormErrorMessage>
                    </FormControl>
                    <Flex justifyContent={'space-between'}>
                        <Button mt={4} bg="lightGray" isLoading={isSubmitting} type="submit">
                            Gửi
                        </Button>
                        <Button mt={4} bg="lightGray" type="button" onClick={() => setShow(!show)}>
                            Hiện mật khẩu
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Flex>
    );
};

export default RegisterPage;
