import { Box, Flex, Tag, TagLabel, TagLeftIcon, Text, Button } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetIngredientWithCate } from '../../../redux/Actions/Ingredient.action';
import { IngredientDetail, IngredientModel } from '../../../Type/IngredientType';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IngredientPost } from '../../../pages/create-recipe';
interface NavBarItemLayout {
    data: IngredientModel;
    addItem: (data: IngredientPost) => void;
}

const NavBarItem = ({ data, addItem }: NavBarItemLayout) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const onAdd = (info: IngredientDetail) => {
        const infoSend = { ...info, nameCate: data.name as string, quantity: 1 };
        addItem(infoSend);
    };
    const getItems = (idCate: string) => {
        setShow(!show);
        if (data.item) {
            return;
        }
        if (!show) setLoading(true);
        dispatch(GetIngredientWithCate(idCate));
    };
    useEffect(() => {
        if (data.item) {
            setLoading(false);
        }
    }, [data.item]);
    return (
        <Flex border={'1px solid black'} direction={'column'} gap="5px 0" padding="0 5px">
            <Box cursor={'pointer'} width={'100%'} onClick={() => getItems(data._id!)}>
                {!loading && <Text> {data.name}</Text>}
                {loading && <Button width={'100%'} isLoading loadingText={data.name}></Button>}
            </Box>

            {data.item && show && (
                <Box>
                    {data.item.map((item) => (
                        <Tag
                            cursor={'pointer'}
                            padding={'5px 10px'}
                            key={item._id}
                            variant="subtle"
                            colorScheme="orange"
                            margin={'5px'}
                            onClick={() => onAdd(item)}
                        >
                            <TagLeftIcon boxSize="12px" as={AiOutlinePlusCircle} />
                            <TagLabel>{item.name}</TagLabel>
                        </Tag>
                    ))}
                </Box>
            )}
        </Flex>
    );
};

export default memo(NavBarItem);
