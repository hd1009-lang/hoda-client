import { Badge, Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import { RecipeModel } from '../../Type/Recipe';

interface BoxRecipeLayout {
    data: RecipeModel;
}
const BoxRecipe = ({ data }: BoxRecipeLayout) => {
    return (
        <Flex
            direction={'column'}
            alignItems="center"
            padding="5px"
            width={'300px'}
            height="200px"
            bg={'white'}
            border="3px solid black"
            borderRadius={'10px'}
            flexShrink="0"
        >
            <NextLink href={`/recipe/${data._id}`}>
                <a>
                    {' '}
                    <Image src={data.img as string} width="100px" height={'100px'} objectFit="cover" alt={data.title} />
                </a>
            </NextLink>

            <NextLink href={`/recipe/${data._id}`}>
                <Link width={'100%'} textAlign="center">
                    {data.title}
                </Link>
            </NextLink>
            <Flex justifyContent={'center'} alignItems="center" width="100%" wrap={'wrap'} gap="5px 0">
                {Object.entries(data.totalRecipe!).map((item) => {
                    return (
                        <Box key={item[0]} width="50%" paddingLeft={'50px'}>
                            {item[0]}:~{Math.floor(item[1])}
                        </Box>
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default BoxRecipe;
