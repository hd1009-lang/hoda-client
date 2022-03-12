import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    calcTotalNutrition,
    HandleDecreaseIngredient,
    HandleIncreaseIngredient,
} from '../../../components/Recipe/Handle/Handle';
import { RootState } from '../../../redux/Reducers';
import { IngredientDetail, IngredientModel, NutritionModel } from '../../../Type/IngredientType';
import { RecipeModel } from '../../../Type/Recipe';
import Router from 'next/router';
import { CreateRecipeAction } from '../../../redux/Actions/Recipe.action';
import LayoutDashboard from '../../../components/Layout/LayoutDashboard';
import Head from 'next/head';
import FormRecipe from '../../../components/Recipe/FormRecipe';
interface CreateLayout {
    ingredients: IngredientModel[];
}
//Need Optimize
export interface IngredientPost extends IngredientDetail {
    nameCate: string;
    quantity: number;
}

const CreateRecipe: NextPage<CreateLayout> = ({}) => {
    const dataIngredient = useSelector((state: RootState) => state.ingredients);
    const [cateListIngredient, setCateListIngredient] = useState<{ [key: string]: IngredientPost[] }>({});
    const [loading, setLoading] = useState(false);
    const [totalRecipe, setTotalRecipe] = useState<NutritionModel>({ calo: 0, protein: 0, carb: 0, fat: 0 });
    const dispatch = useDispatch();
    useEffect(() => {
        if (dataIngredient.length > 1 && Object.keys(cateListIngredient).length < 1) {
            let nameCate = dataIngredient.map((el) => el.name).reduce((a, v) => ({ ...a, [v as string]: [] }), {});
            setCateListIngredient(nameCate);
        }
    }, [cateListIngredient, dataIngredient]);
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
        newPost.totalRecipe = totalRecipe;
        const result = await dispatch(CreateRecipeAction(newPost));
        if (!result) {
            setLoading(false);
            return;
        } else {
            setLoading(false);
            Router.push(`/dashboard/recipe/edit/${result}`);
        }
    };
    return (
        <LayoutDashboard>
            <Head>
                <title>Create</title>
            </Head>
            <FormRecipe
                dataIngredient={dataIngredient}
                addItem={addItem}
                cateListIngredient={cateListIngredient}
                onDecrease={onDecrease}
                totalRecipe={totalRecipe}
                onSubmit={onCreate}
            />
        </LayoutDashboard>
    );
};

export default CreateRecipe;

{
    /* 
            <Flex width={'100%'} height="100vh">
                <MotionFlex
                    variants={variants}
                    initial={'initial'}
                    animate={show.show1 || show.show2 ? 'open' : 'close'}
                    height="100%"
                    bg="yellow.200"
                    position={'fixed'}
                    zIndex="2"
                >
                    <MotionBox
                        variants={variants}
                        initial={'initial'}
                        animate={show.show1 ? 'open' : 'close'}
                        width={['100%', '60%', '100%']}
                        bg="pink.100"
                        maxWidth={'450px'}
                        overflow={'scroll'}
                    >
                        <NavBar ingredients={dataIngredient} addItem={addItem} />
                    </MotionBox>
                    <MotionBox
                        variants={variants}
                        initial={'initial'}
                        animate={show.show2 ? 'open' : 'close'}
                        height="100%"
                    >
                        <IngredientList
                            list={cateListIngredient}
                            onDecrease={onDecrease}
                            addItem={addItem}
                            totalRecipe={totalRecipe}
                        />
                    </MotionBox>
                    <Flex
                        height={'100%'}
                        display={['flex', 'flex', 'none']}
                        direction={'column'}
                        gap="5px 0"
                        width={'fit-content'}
                        bg="tomato"
                    >
                        <Button onClick={() => setShow((show) => ({ ...show, show1: !show.show1 }))}>Show</Button>
                        <Button onClick={() => setShow((show) => ({ ...show, show2: !show.show2 }))}>Show 2</Button>
                    </Flex>
                </MotionFlex>
                <Flex width={'100%'} height="100%" bg="red.500">
                    <BoxStep onSubmit={onCreate} />
                </Flex>
            </Flex> */
}
