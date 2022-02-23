import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientApis from '../api/Ingredient';
import NavBar from '../components/Recipe/Nav/NavBar';
import { IngredientCommand } from '../redux/Command/Ingredient.command';
import { RootState } from '../redux/Reducers';
import { IngredientModel } from '../Type/IngredientType';
interface CreateLayout {
    ingredients: IngredientModel[];
}

const CreateRecipe: NextPage<CreateLayout> = ({}) => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state: RootState) => state.ingredients);
    return (
        <Flex width={'100%'} height="100vh">
            <Box width={'500px'} height="100%" bg="pink.100" overflow={'scroll'}>
                <NavBar ingredients={ingredients} />
            </Box>
            <Box width={'100%'} height="100%" bg="red.500"></Box>
        </Flex>
    );
};

export default CreateRecipe;
