import { Flex, FormControl, FormErrorMessage, FormLabel, HStack, useRadioGroup } from '@chakra-ui/react';
import { Control, useController, useForm } from 'react-hook-form';
import React from 'react';
import data, { GroupRadioLayout } from './data';
import RadioCard from './RadioCard';


const GroupRadio = ({ field, label, data }: GroupRadioLayout) => {
    const { getRootProps, getRadioProps } = useRadioGroup();

    const group = getRootProps();

    return (
        <Flex {...field} alignItems={'center'} gap="0 5px">
            <FormLabel>{label}</FormLabel>
            <HStack {...group}>
                {data.map((option) => {
                    const value = option.value;
                    const radio = getRadioProps({ value });
                    return (
                        <RadioCard key={value} data={radio}>
                            {option.name}
                        </RadioCard>
                    );
                })}
            </HStack>
        </Flex>
    );
};

export default GroupRadio;
