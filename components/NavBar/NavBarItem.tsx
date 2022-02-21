import { Box } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetIngredientWithCate } from '../../redux/Actions/Ingredient.action';
import { IngredientModel } from '../../Type/IngredientType';
interface NavBarItemLayout {
    data: IngredientModel;
}

const NavBarItem = ({ data }: NavBarItemLayout) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const getItems = (idCate: string) => {
        setShow(!show);
        if (data.item) {
            return;
        }
        dispatch(GetIngredientWithCate(idCate));
    };
    return (
        <Box cursor={'pointer'} onClick={() => getItems(data._id!)}>
            {data.name}
            {data.item && show && data.item.map((item) => <div key={item._id}>{item.name}</div>)}
        </Box>
    );
};

export default memo(NavBarItem);
