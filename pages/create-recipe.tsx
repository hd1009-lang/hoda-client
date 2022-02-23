import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientApis from '../api/Ingredient';
import IngredientList from '../components/Recipe/Ingredient/IngredientList';
import NavBar from '../components/Recipe/Nav/NavBar';
import { IngredientCommand } from '../redux/Command/Ingredient.command';
import { RootState } from '../redux/Reducers';
import { IngredientDetail, IngredientModel } from '../Type/IngredientType';
import { PostModel } from '../Type/Post';
interface CreateLayout {
    ingredients: IngredientModel[];
}

export interface IngredientPost extends IngredientDetail {
    nameCate: string;
    quantity: number;
}

const CreateRecipe: NextPage<CreateLayout> = ({}) => {
    const dataIngredient = useSelector((state: RootState) => state.ingredients);
    const [cateListIngredient, setCateListIngredient] = useState<{ [key: string]: IngredientPost[] }>({});
    const [post, setPost] = useState<PostModel>({});
    useEffect(() => {
        if (Object.keys(cateListIngredient).length === 0) {
            let nameCate = dataIngredient.map((el) => el.name).reduce((a, v) => ({ ...a, [v as string]: [] }), {});
            setCateListIngredient(nameCate);
            return;
        }
    }, []);

    const addItem = (data: IngredientPost) => {
        handleAddIngredient(data);
    };
    const handleAddIngredient = (data: IngredientPost) => {
        let isSame = false;
        const currentList = { ...cateListIngredient };
        if (!currentList.hasOwnProperty(data.nameCate)) {
            return;
        }
        currentList[data.nameCate].map((item) => {
            if (item._id === data._id) {
                isSame = true;
                item.quantity!++;
            }
        });
        if (!isSame) {
            currentList[data.nameCate].push(data);
        }
        setCateListIngredient(currentList);
    };
    return (
        <Flex width={'100%'} height="100vh">
            <Box width={'500px'} height="100%" bg="pink.100" overflow={'scroll'}>
                <NavBar ingredients={dataIngredient} addItem={addItem} />
            </Box>
            <Box width={'100%'} height="100%" bg="red.500">
                <IngredientList list={cateListIngredient} />
            </Box>
        </Flex>
    );
};

export default CreateRecipe;
