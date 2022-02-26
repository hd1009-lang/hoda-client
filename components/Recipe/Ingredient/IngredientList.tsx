import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { IngredientPost } from '../../../pages/dashboard/recipe/create';

import IngredientItem from './IngredientItem';

interface BoxIngredientList {
    list: {
        [key: string]: IngredientPost[];
    };
    onDecrease: (data: IngredientPost) => void;
    addItem: (data: IngredientPost) => void;
}
const BoxIngredientList = ({ list, onDecrease, addItem }: BoxIngredientList) => {
    const total = useMemo(() => {
        const value: { calo: number; fat: number; protein: number; carb: number } = {
            calo: 0,
            fat: 0,
            protein: 0,
            carb: 0,
        };

        if (Object.keys(list).length > 0) {
            Object.values(list).forEach((items) => {
                items.forEach((item) => {
                    value.calo += item.nutrition?.calo! * item.quantity;
                    value.fat += item.nutrition?.fat! * item.quantity;
                    value.protein += item.nutrition?.protein! * item.quantity;
                    value.carb += item.nutrition?.carb! * item.quantity;
                });
            });
            // setTotal(value);
        }
        return value;
    }, [list, onDecrease]);
    return (
        <Box width={'20%'} height="100%" bg={'pink.200'}>
            {Object.entries(total).map((item) => {
                return (
                    <div key={item[0]}>
                        {item[0]}: {Math.floor(item[1])}
                    </div>
                );
            })}
            {Object.entries(list).map((el) => {
                if (el[1].length > 0) {
                    return <IngredientItem key={el[0]} data={el} onDecrease={onDecrease} addItem={addItem} />;
                }
            })}
        </Box>
    );
};

export default BoxIngredientList;
