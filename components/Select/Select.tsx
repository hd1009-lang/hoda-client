import { Box, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SelectBoxLayout, SelectValueType } from './SelectTypes';

const SelectBox = ({ data, field, label }: SelectBoxLayout) => {
    const { register } = useForm();
    return (
        <Box {...field}>
            {' '}
            <FormLabel>{label}</FormLabel>
            <Select placeholder="Chọn">
                {data.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>
                            {item.description}
                        </option>
                    );
                })}
            </Select>
        </Box>
    );
};

export default SelectBox;
