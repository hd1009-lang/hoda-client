import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MotionBox, MotionFlex } from '../../lib/motion';
import { IngredientPost } from '../../pages/dashboard/recipe/create';
import { IngredientModel, NutritionModel } from '../../Type/IngredientType';
import { RecipeModel, ResponseRecipeAfter } from '../../Type/Recipe';
import IngredientList from './Ingredient/IngredientList';
import NavBar from './Nav/NavBar';
import BoxStep from './Step/BoxStep';
import { HiClipboardList } from 'react-icons/hi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
interface FormProps {
    dataIngredient: IngredientModel[];
    addItem: (data: IngredientPost) => void;
    cateListIngredient: { [key: string]: IngredientPost[] };
    onDecrease: (data: IngredientPost) => void;
    totalRecipe: NutritionModel;
    onSubmit: (data: RecipeModel) => void;
    data?: ResponseRecipeAfter;
}
const FormRecipe = ({
    dataIngredient,
    addItem,
    cateListIngredient,
    onDecrease,
    totalRecipe,
    onSubmit,
    data,
}: FormProps) => {
    const [show, setShow] = useState<{ store: boolean; ingredient: boolean }>({
        store: false,
        ingredient: false,
    });
    const onShowBox = (name: string) => {
        const currentShow = { ...show };
        if (name === 'store') {
            return setShow({ ...currentShow, store: !currentShow.store, ingredient: false });
        } else if (name === 'ingredient') {
            return setShow({ ...currentShow, ingredient: !currentShow.ingredient, store: false });
        }
    };
    return (
        <Flex width={'100%'} height="100vh">
            <MotionBox
                variants={variants}
                initial={'initial'}
                animate={show.store ? 'open' : 'initial'}
                transition={{ duration: '.5', when: 'beforeChildren' }}
                width={['300px', '600px']}
                bg="pink.100"
                overflow={'scroll'}
                flexShrink="0"
                position={'absolute'}
                inset="0"
                zIndex={3}
            >
                <NavBar ingredients={dataIngredient} addItem={addItem} />
            </MotionBox>
            <MotionBox
                variants={variants}
                initial={'initial'}
                width={['300px', '600px']}
                animate={show.ingredient ? 'open' : 'initial'}
                transition={{ duration: '.5', when: 'afterChildren' }}
                maxWidth={['300px', '600px']}
                bg="pink.100"
                overflow={'scroll'}
                flexShrink="0"
                position={'absolute'}
                inset="0"
                zIndex={3}
            >
                <IngredientList
                    list={cateListIngredient}
                    onDecrease={onDecrease}
                    addItem={addItem}
                    totalRecipe={totalRecipe}
                />
            </MotionBox>
            <MotionBox
                variants={variants}
                initial={'initial'}
                position={'absolute'}
                width={['300px', '600px']}
                zIndex={0}
                height={'100%'}
                animate={show.ingredient || show.store ? 'open' : 'initial'}
                transition={{ duration: '.5', when: 'afterChildren' }}
            >
                <Flex
                    height={'100%'}
                    position="absolute"
                    right={'-50px'}
                    direction={'column'}
                    justifyContent="center"
                    alignItems={'flex-start'}
                    gap="10px 0"
                    width="45px"
                >
                    <Box
                        border={'1px solid black'}
                        borderRadius="50%"
                        padding={'10px'}
                        fontSize="20px"
                        onClick={() => onShowBox('store')}
                        _hover={{
                            background: 'white',
                            fontWeight: 'bold',
                            transform: 'scale(1.1)',
                        }}
                        _active={{
                            bg: '#dddfe2',
                            transform: 'scale(0.98)',
                            borderColor: '#bec3c9',
                        }}
                    >
                        <HiClipboardList />
                    </Box>
                    <Box
                        border={'1px solid black'}
                        borderRadius="50%"
                        padding={'10px'}
                        fontSize="20px"
                        onClick={() => onShowBox('ingredient')}
                        _hover={{
                            background: 'white',
                            fontWeight: 'bold',
                            transform: 'scale(1.1)',
                        }}
                        _active={{
                            bg: '#dddfe2',
                            transform: 'scale(0.98)',
                            borderColor: '#bec3c9',
                        }}
                    >
                        <AiOutlineCalculator />
                    </Box>
                </Flex>
            </MotionBox>
            <Flex width={'100%'} height="100%" bg="red.500">
                {data && data.title && <BoxStep onSubmit={onSubmit} data={data} />}
                {!data && <BoxStep onSubmit={onSubmit} />}
            </Flex>
        </Flex>
    );
};

export default FormRecipe;

const variants = {
    initial: { x: '-100%', opacity: 1 },
    open: { x: '0', opacity: 1 },
    close: { x: '0', opacity: 1 },
};
