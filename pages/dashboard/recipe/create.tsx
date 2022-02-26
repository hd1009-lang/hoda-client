import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { HandleDecreaseIngredient, HandleIncreaseIngredient } from '../../../components/Recipe/Handle/Handle';
import IngredientList from '../../../components/Recipe/Ingredient/IngredientList';
import NavBar from '../../../components/Recipe/Nav/NavBar';
import BoxStep from '../../../components/Recipe/Step/BoxStep';
import { RootState } from '../../../redux/Reducers';
import { IngredientDetail, IngredientModel } from '../../../Type/IngredientType';
import { RecipeModel } from '../../../Type/Recipe';
import { AiFillFileImage } from 'react-icons/ai';
import RecipeApis from '../../../api/Recipe';
import cookies from 'next-cookies';
import axios from 'axios';
import Router from 'next/router';
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
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (Object.keys(cateListIngredient).length === 0) {
            let nameCate = dataIngredient.map((el) => el.name).reduce((a, v) => ({ ...a, [v as string]: [] }), {});
            setCateListIngredient(nameCate);
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
    const onCreate: SubmitHandler<RecipeModel> = async (data) => {
        setLoading(true);
        let newList: { idIngredient: string; quantity: number }[] = [];
        Object.values(cateListIngredient).map((item) => {
            if (item.length > 0) {
                item.map((el) => {
                    newList.push({ idIngredient: el._id as string, quantity: el.quantity });
                });
            }
            return;
        });
        const newPost: RecipeModel = {};
        newPost.img = data.img;
        newPost.data = data.data;
        newPost.title = data.title;
        newPost.ingredients = newList;
        const result = await RecipeApis.create(newPost);
        if (result.data) {
            Router.push(`/dashboard/recipe/edit/${result.data}`);
        }
        setLoading(false);
    };

    return (
        <Flex width={'100%'} height="100vh">
            <Box width={'500px'} height="100%" bg="pink.100" overflow={'scroll'}>
                <NavBar ingredients={dataIngredient} addItem={addItem} />
            </Box>
            <Flex width={'100%'} height="100%" bg="red.500">
                {loading && <div>Loading........</div>}
                <IngredientList list={cateListIngredient} onDecrease={onDecrease} addItem={addItem} />
                <BoxStep onCreate={onCreate} />
            </Flex>
        </Flex>
    );
};
export async function getServerSideProps(ctx: NextPageContext) {
    const { refresh_token } = cookies(ctx);
    try {
        const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/refresh_token`, {
            headers: {
                Cookie: refresh_token as string,
            },
        });

        return {
            props: {},
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
export default CreateRecipe;
