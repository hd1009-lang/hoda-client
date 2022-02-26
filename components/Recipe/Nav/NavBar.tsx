import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IngredientPost } from '../../../pages/dashboard/recipe/create';
import { RootState } from '../../../redux/Reducers';
import { IngredientModel } from '../../../Type/IngredientType';
import NavBarItem from './NavBarItem';
interface NavbarLayout {
    ingredients: IngredientModel[];
    addItem: (data: IngredientPost) => void;
}
const NavBar = ({ ingredients, addItem }: NavbarLayout) => {
    const [data, setData] = useState<IngredientModel[]>(ingredients);
    const ingredientsGlobal = useSelector((state: RootState) => state.ingredients);
    useEffect(() => {
        setData(ingredientsGlobal);
    }, [ingredientsGlobal]);
    return (
        <Flex direction={'column'} gap="10px 0" padding={'5px 10px'}>
            {' '}
            {data.map((ingredient) => {
                return <NavBarItem key={ingredient._id} data={ingredient} addItem={addItem} />;
            })}
        </Flex>
    );
};

export default NavBar;
