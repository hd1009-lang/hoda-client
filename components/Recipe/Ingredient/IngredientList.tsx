import { Box, Flex } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { IngredientPost } from '../../../pages/dashboard/recipe/create';
import { NutritionModel } from '../../../Type/IngredientType';

import IngredientItem from './IngredientItem';
// Need Optimize
interface BoxIngredientList {
    list: {
        [key: string]: IngredientPost[];
    };
    onDecrease: (data: IngredientPost) => void;
    addItem: (data: IngredientPost) => void;
    totalRecipe: NutritionModel;
}
const BoxIngredientList = ({ list, onDecrease, addItem, totalRecipe }: BoxIngredientList) => {
    return (
        <Box width={'20%'} height="100%">
            {Object.entries(totalRecipe).map((item) => {
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
