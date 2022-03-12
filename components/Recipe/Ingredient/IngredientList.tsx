import { Box, Flex } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { MotionBox } from '../../../lib/motion';
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
        <MotionBox
           
            width={'100%'}
            height="100%"
            // position={['absolute', 'initial']}
            // left="0"
            bg="red.300"
            // zIndex={'1'}
        >
            <Box width={'100%'}>
                {Object.entries(totalRecipe).map((item) => {
                    return (
                        <div key={item[0]}>
                            {item[0]}: {Math.floor(item[1])}
                        </div>
                    );
                })}
            </Box>
            {Object.entries(list).map((el,index) => {
                if (el[1].length > 0) {
                    return <IngredientItem key={index} data={el} onDecrease={onDecrease} addItem={addItem} />;
                }
            })}
        </MotionBox>
    );
};

export default BoxIngredientList;
