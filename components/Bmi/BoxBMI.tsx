import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import data from '../Radio/data';
import GroupRadio from '../Radio/GroupRadio';
type FormValues = {
    weight: number;
    height: number;
    gender: number;
    activity: number;
};
const BoxBMI = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm<FormValues>();
    console.log(control);

    const onUpdateBmi: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };
    return (
        <Box width={'500px'} height="fit-content" padding={'5px 10px'} margin="0 auto" bg="white">
            <form onSubmit={handleSubmit(onUpdateBmi)}>
                <Flex gap={'0 5px'}>
                    <FormControl isInvalid={Boolean(errors.weight)}>
                        <FormLabel htmlFor="">Cân nặng</FormLabel>
                        <Input
                            type={'number'}
                            placeholder="Cân nặng của bạn"
                            {...register('weight', {
                                required: 'Vui lòng nhập cân nặng của bạn',
                            })}
                        />
                        <FormErrorMessage>{errors.weight && errors.weight.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.height)}>
                        <FormLabel htmlFor="">Chiều cao</FormLabel>
                        <Input
                            type={'number'}
                            placeholder="Chiều cao của bạn"
                            {...register('height', {
                                required: 'Vui lòng nhập chiều cao của bạn',
                            })}
                        />
                        <FormErrorMessage>{errors.height && errors.height.message}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <FormControl isInvalid={Boolean(errors.gender)}>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => <GroupRadio field={field} label="Giới tính" data={data.option} />}
                        rules={{
                            required: { value: true, message: 'Vui lòng chọn giới tính.' },
                        }}
                    />
                    <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" isLoading={isSubmitting} mt={4} bg="lightGray">
                    Xác nhận
                </Button>
            </form>
        </Box>
    );
};

export default BoxBMI;
