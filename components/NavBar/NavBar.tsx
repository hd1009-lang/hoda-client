import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import { IngredientModel } from '../../Type/IngredientType';
import NavBarItem from './NavBarItem';
interface NavbarLayout {
    ingredients: IngredientModel[];
}
const NavBar = ({ ingredients }: NavbarLayout) => {
    const [data, setData] = useState<IngredientModel[]>(ingredients);
    const ingredientsGlobal = useSelector((state: RootState) => state.ingredients);
    useEffect(() => {
        setData(ingredientsGlobal);
    }, [ingredientsGlobal]);
    return (
        <div>
            {' '}
            {data.map((ingredient) => {
                return <NavBarItem key={ingredient._id} data={ingredient} />;
            })}
        </div>
    );
};

export default NavBar;
