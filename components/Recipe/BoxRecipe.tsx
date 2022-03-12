import { Badge, Box, Flex, Link, List, ListItem, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import { RecipeModel } from '../../Type/Recipe';
import { AiOutlineHeart } from 'react-icons/ai';

interface BoxRecipeLayout {
    data: RecipeModel;
}
const BoxRecipe = ({ data }: BoxRecipeLayout) => {
    return (
        <Flex
            direction={'column'}
            alignItems="center"
            margin={'10px'}
            width={['100%', 'calc(50% - 20px)', 'calc(33.33% - 20px)', 'calc(25% - 20px)', 'calc(14.2% - 20px)']}
            maxWidth={['250px', '300px']}
            height="300px"
            bg={'white'}
            border="1.5px solid lightGray"
            flexShrink="0"
            gap={'5px 0'}
            overflow="hidden"
            padding={'10px'}
        >
            <Flex direction={'column'} width={'85%'} height="60%" position="relative" flexShrink={0}>
                <NextLink href={`/recipe/${data._id}`}>
                    <a style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Image
                            src={data.img as string}
                            layout="fill"
                            objectFit="contain"
                            alt={data.title}
                            objectPosition={'center'}
                        />
                    </a>
                </NextLink>
            </Flex>

            <Flex
                justifyContent={'space-between'}
                alignItems="flex-start"
                width="100%"
                height={'30%'}
                flex="1"
                flexShrink="0"
                wrap={'wrap'}
                padding="5px 15px"
            >
                <List width={'50%'} flexShrink="0">
                    {Object.entries(data.totalRecipe!).map((item,index) => {
                        return (
                            <ListItem key={item[0]} fontSize="12px">
                                <strong>{item[0]}</strong>: {Math.floor(item[1])}
                            </ListItem>
                        );
                    })}
                </List>
                <NextLink href={`/recipe/${data._id}`}>
                    <Link width={'50%'} textAlign="right" fontWeight={'bold'} fontSize="18px">
                        {data.title}
                    </Link>
                </NextLink>
            </Flex>
            <Flex
                width={'100%'}
                height="10%"
                flexShrink={0}
                alignItems={'center'}
                justifyContent="flex-end"
                fontSize={'15px'}
                padding="5px 20px"
                color={'lightgray'}
            >
                <AiOutlineHeart />: 20
            </Flex>
        </Flex>
    );
};

export default BoxRecipe;
