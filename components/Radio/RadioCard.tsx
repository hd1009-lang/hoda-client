import React, { FC, ReactNode } from 'react';
import { useRadio, Box, UseRadioProps } from '@chakra-ui/react';
interface propsType {
    children?: ReactNode;
    data: UseRadioProps;
}
const RadioCard = (props: propsType) => {
    const { getInputProps, getCheckboxProps } = useRadio(props.data);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioCard;
