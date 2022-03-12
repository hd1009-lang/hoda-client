import { Box, Flex, Tag, TagLabel, TagLeftIcon, Text, Button } from '@chakra-ui/react';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetIngredientWithCate } from '../../../redux/Actions/Ingredient.action';
import { IngredientDetail, IngredientModel } from '../../../Type/IngredientType';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IngredientPost } from '../../../pages/dashboard/recipe/create';
interface NavBarItemLayout {
    data: IngredientModel;
    addItem: (data: IngredientPost) => void;
}

const NavBarItem = ({ data, addItem }: NavBarItemLayout) => {
    const [show, setShow] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const quantity = useRef<HTMLInputElement | null>(null);
    const cacheInfo = useRef<{ [key: string]: IngredientDetail }>({});
    const dispatch = useDispatch();
    const onAdd = (info: IngredientDetail) => {
        cacheInfo.current['0'] = info;
        setShowInput(true);
    };
    const handleAdd = () => {
        const value = quantity.current?.value;

        const infoSend = { ...cacheInfo.current['0'], nameCate: data.name as string, quantity: Number(value) };
        addItem(infoSend);
        quantity.current!.value = '';
        setShowInput(false);
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
            {showInput && (
                <Box
                    position={'fixed'}
                    top="10px"
                    left={'50%'}
                    zIndex="5"
                    width={'200px'}
                    height="200px"
                    bg="yellow.200"
                >
                    <input type="number" ref={quantity} />
                    <Button onClick={() => handleAdd()}>Xác nhận</Button>
                </Box>
            )}
            <Box cursor={'pointer'} width={'100%'} onClick={() => getItems(data._id!)}>
                {!loading && <Text> {data.name}</Text>}
                {loading && <Button width={'100%'} isLoading loadingText={data.name}></Button>}
            </Box>

            {data.item && show && (
                <Box>
                    {data.item.map((item, index) => (
                        <Tag
                            cursor={'pointer'}
                            padding={'5px 10px'}
                            key={index}
                            variant="subtle"
                            colorScheme="orange"
                            margin={'5px'}
                            onClick={() => onAdd(item)}
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
