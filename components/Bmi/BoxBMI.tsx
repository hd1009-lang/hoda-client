import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,

} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import data, { BmiModel } from './data';
import GroupRadio from '../Radio/GroupRadio';
import SelectBox from '../Select/Select';
import { useDispatch } from 'react-redux';
import { UpdateBmi } from '../../redux/Actions/User.action';

const BoxBMI = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset,
    } = useForm<BmiModel>();

    const onUpdateBmi: SubmitHandler<BmiModel> = async (data) => {
        await dispatch(UpdateBmi(data));
        reset();
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
                        render={({ field }) => <GroupRadio field={field} label="Giới tính" data={data.optionGender} />}
                        rules={{
                            required: { value: true, message: 'Vui lòng chọn giới tính.' },
                        }}
                    />
                    <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.activity)}>
                    <Controller
                        name="activity"
                        control={control}
                        render={({ field }) => (
                            <SelectBox data={data.optionActivity} field={field} label="Tần suất hoạt động" />
                        )}
                        rules={{ required: { value: true, message: 'Vuo lòng chọn chế độ hoạt động' } }}
                    />
                    <FormErrorMessage>{errors.activity?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.yearOfBirth)}>
                    <FormLabel htmlFor="">Năm sinh</FormLabel>
                    <Input
                        type={'number'}
                        placeholder="Năm sinh của bạn"
                        {...register('yearOfBirth', {
                            required: 'Vui lòng nhập năm sinh của bạn',
                        })}
                    />
                    <FormErrorMessage>{errors.yearOfBirth && errors.yearOfBirth.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" isLoading={isSubmitting} mt={4} bg="lightGray">
                    Xác nhận
                </Button>
            </form>
        </Box>
    );
};

export default BoxBMI;
