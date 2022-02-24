import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import IngredientList from '../../components/Recipe/Ingredient/IngredientList';
import NavBar from '../../components/Recipe/Nav/NavBar';
import { RootState } from '../../redux/Reducers';
import { IngredientDetail, IngredientModel } from '../../Type/IngredientType';
import data from './data';
import { HandleDecreaseIngredient, HandleIncreaseIngredient } from '../../components/Recipe/Handle/Handle';
interface EditRecipeLayout {
    ingredients: IngredientModel[];
}

export interface IngredientPost extends IngredientDetail {
    nameCate: string;
    quantity: number;
}

const EditRecipe: NextPage<EditRecipeLayout> = () => {
    const dataIngredient = useSelector((state: RootState) => state.ingredients);
    const [cateListIngredient, setCateListIngredient] = useState<{ [key: string]: IngredientPost[] }>({});
    useEffect(() => {
        if (Object.keys(cateListIngredient).length === 0) {
            let nameCate: { [key: string]: IngredientPost[] } = dataIngredient
                .map((el) => el.name)
                .reduce((a, v) => ({ ...a, [v as string]: [] }), {});

            setCateListIngredient(nameCate);
            if (Object.keys(nameCate).length > 1) {
                data.forEach((item) => {
                    console.log(nameCate[item.nameCate]);
                    nameCate[item.nameCate].push(item);
                });
            }
            return;
        }
    }, [cateListIngredient, dataIngredient]);

    const addItem = (data: IngredientPost) => {
        const newList = HandleIncreaseIngredient(cateListIngredient, data);
        setCateListIngredient(newList!);
    };
    const onDecrease = (data: IngredientPost) => {
        const newList = HandleDecreaseIngredient(cateListIngredient, data);
        setCateListIngredient(newList!);
    };
    return (
        <Flex width={'100%'} height="100vh">
            <Box width={'500px'} height="100%" bg="pink.100" overflow={'scroll'}>
                <NavBar ingredients={dataIngredient} addItem={addItem} />
            </Box>
            <Box width={'100%'} height="100%" bg="red.500">
                <IngredientList list={cateListIngredient} onDecrease={onDecrease} addItem={addItem} />
            </Box>
        </Flex>
    );
};

export default EditRecipe;
