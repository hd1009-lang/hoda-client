import { Box, Flex } from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import { IngredientPost } from '../../../pages/dashboard/recipe/create';
interface IngredientItemLayout {
    data: [string, IngredientPost[]];
    onDecrease: (data: IngredientPost) => void;
    addItem: (data: IngredientPost) => void;
}
const IngredientItem = ({ data, onDecrease, addItem }: IngredientItemLayout) => {
    const calculateValue = (info: IngredientPost[]) => {
        let totalItem = 0;
        info.forEach((item) => {
            totalItem += item.nutrition?.calo! * item.quantity;
        });
        return Math.floor(totalItem);
    };
    const calculation = useMemo(() => calculateValue(data[1]), [data]);

    return (
        <Box width={'100%'} padding="5px" borderBottom={'1px solid black'} key={data[0]}>
            {data[0]}:{calculation}
            {data[1].map((item) => {
                return (
                    <Flex key={item._id} justifyContent="space-between">
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                        <button onClick={() => onDecrease(item)}>Decrease</button>
                        <button onClick={() => addItem(item)}>Increase</button>
                    </Flex>
                );
            })}
        </Box>
    );
};

export default memo(IngredientItem);
