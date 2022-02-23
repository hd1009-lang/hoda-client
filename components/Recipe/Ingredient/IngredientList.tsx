import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IngredientPost } from '../../../pages/create-recipe';
import { RootState } from '../../../redux/Reducers';
import { IngredientDetail } from '../../../Type/IngredientType';
interface Ingredient extends IngredientDetail {
    nameCate: string;
    quantity: number;
}

interface BoxIngredientList {
    list: {
        [key: string]: IngredientPost[];
    };
}
const BoxIngredientList = ({ list }: BoxIngredientList) => {
    console.log(list);
    return (
        <Box width={'100%'} height="20%" bg={'pink.200'}>
            {Object.entries(list).map((el) => {
                if (el[1].length > 0) {
                    return (
                        <div key={el[0]}>
                            {el[0]}
                            {el[1].map((item) => {
                                return (
                                    <div key={item._id}>
                                        {item.name}
                                        {item.quantity}
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            })}
        </Box>
    );
};

export default BoxIngredientList;
