import { Box, Flex, list } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IngredientList from '../../../../components/Recipe/Ingredient/IngredientList';
import NavBar from '../../../../components/Recipe/Nav/NavBar';
import { RootState } from '../../../../redux/Reducers';
import { IngredientDetail, IngredientModel, NutritionModel } from '../../../../Type/IngredientType';
import {
    calcTotalNutrition,
    HandleDecreaseIngredient,
    HandleIncreaseIngredient,
} from '../../../../components/Recipe/Handle/Handle';
import BoxStep from '../../../../components/Recipe/Step/BoxStep';
import { RecipeModel, ResponseRecipeAfter } from '../../../../Type/Recipe';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import RecipeApis from '../../../../api/Recipe';
interface EditRecipeLayout {
    ingredients: IngredientModel[];
}

export interface IngredientPost extends IngredientDetail {
    nameCate: string;
    quantity: number;
}

const EditRecipe: NextPage<EditRecipeLayout> = () => {
    const dataIngredient = useSelector((state: RootState) => state.ingredients);
    const router = useRouter();
    const { id } = router.query;
    const [cateListIngredient, setCateListIngredient] = useState<{ [key: string]: IngredientPost[] }>({});
    const [data, setData] = useState<ResponseRecipeAfter>();
    const [totalRecipe, setTotalRecipe] = useState<NutritionModel>({ calo: 0, protein: 0, carb: 0, fat: 0 });

    useEffect(() => {
        const getInfo = async () => {
            console.log(data);

            if (!id) return;
            if (Object.keys(cateListIngredient).length === 0) {
                if (data) return;
                const result = await RecipeApis.getDetailRecipe(id as string);
                let nameCate: { [key: string]: IngredientPost[] } = dataIngredient
                    .map((el) => el.name)
                    .reduce((a, v) => ({ ...a, [v as string]: [] }), {});
                console.log({ nameCate });

                setCateListIngredient(nameCate);
                if (Object.keys(nameCate).length > 1) {
                    result.data.ingredients!.forEach((item) => {
                        nameCate[item.nameCate].push(item);
                    });
                }
                setData(result.data);
                console.log(result.data);

                setTotalRecipe(result.data.totalRecipe!);
            }
        };

        getInfo();
    }, [id, cateListIngredient]);

    const addItem = (data: IngredientPost) => {
        const newList = HandleIncreaseIngredient(cateListIngredient, data);
        setCateListIngredient(newList!);
        const newTotal = calcTotalNutrition(newList!);
        setTotalRecipe(newTotal);
    };
    const onDecrease = (data: IngredientPost) => {
        const newList = HandleDecreaseIngredient(cateListIngredient, data);
        setCateListIngredient(newList!);
        const newTotal = calcTotalNutrition(newList!);
        setTotalRecipe(newTotal);
    };
    const onCreate: SubmitHandler<RecipeModel> = async (data) => {
        // let newList: { idIngredient: string; quantity: number }[] = [];
        // Object.values(cateListIngredient).map((item) => {
        //     if (item.length > 0) {
        //         item.map((el) => {
        //             newList.push({ idIngredient: el._id as string, quantity: el.quantity });
        //         });
        //     }
        //     return;
        // });
        console.log(data);

        // const newPost: RecipeModel = {};
        // newPost.img = data.img;
        // newPost.data = data.data;
        // newPost.title = data.title;
        // newPost.ingredients = newList;
        // console.log(newPost);
        // const result = await RecipeApis.create(newPost);
        // console.log(result);
    };
    return (
        <Flex width={'100%'} height="100vh">
            <Box width={'500px'} height="100%" bg="pink.100" overflow={'scroll'}>
                <NavBar ingredients={dataIngredient} addItem={addItem} />
            </Box>
            <Flex width={'100%'} height="100%" bg="red.500">
                <IngredientList
                    list={cateListIngredient}
                    onDecrease={onDecrease}
                    addItem={addItem}
                    totalRecipe={totalRecipe}
                />
                {data?.title && <BoxStep onCreate={onCreate} data={data} />}
            </Flex>
        </Flex>
    );
};

export default EditRecipe;
