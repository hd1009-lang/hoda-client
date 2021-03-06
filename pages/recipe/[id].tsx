import { Flex, Box, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import RecipeApis from '../../api/Recipe';
import { ResponseRecipeAfter } from '../../Type/Recipe';
import { IngredientPost } from '../dashboard/recipe/create';
interface ingredientModel {
    [key: string]: IngredientPost[];
}
interface DetailRecipeLayout {
    data: ResponseRecipeAfter;
}
const DetailRecipe: NextPage<DetailRecipeLayout> = ({ data }) => {
    const router = useRouter();
    const [cateListIngredient, setCateListIngredient] = useState<{ [key: string]: IngredientPost[] }>({});
    useEffect(() => {
        if (Object.keys(cateListIngredient).length === 0) {
            let nameCate: ingredientModel = data
                .ingredients!.map((el) => el.nameCate)
                .reduce((a, v) => ({ ...a, [v as string]: [] }), {});
            setCateListIngredient(nameCate);
            if (Object.keys(nameCate).length >= 1) {
                data.ingredients!.forEach((item) => {
                    nameCate[item.nameCate].push(item);
                });
            }
        }
    }, [cateListIngredient, data.ingredients]);
    return (
        <Flex
            alignItems={'center'}
            justifyContent="flex-start"
            direction={'column'}
            gap="5px"
            width={['100%', '100%', '80%', '1000px']}
            height={'95vh'}
            overflowY="scroll"
            padding={'5px'}
            margin="0 auto"
            minWidth={'300px'}
        >
            <Head>
                <link rel="icon" href={data.img} />
                <title>{data.title}</title>
            </Head>
            <Flex width={'100%'} direction={['column', 'row']} justifyContent="flex-start">
                <Box
                    width={['100%', '350px', '350px', '500px']}
                    height={['350px', '350px', '350px', '500px']}
                    position="relative"
                    flexShrink={0}
                >
                    <Image src={data.img as string} alt={data.title} layout="fill" objectFit="contain" />
                </Box>
                <Flex gap={'5px 0'} wrap="wrap" width={'100%'} height="fit-content">
                    {Object.entries(cateListIngredient).map((item) => {
                        return (
                            <Box
                                width={'calc(50% - 4px)'}
                                margin="0 2px"
                                key={item[0]}
                                border="1px solid lightGray"
                                padding={'5px'}
                                borderRadius="5px"
                            >
                                <Text fontSize={'15px'} fontWeight="bold">
                                    {item[0]}
                                </Text>
                                {item[1].map((el) => {
                                    return (
                                        <Flex justifyContent={'space-between'} fontSize={'12px'} key={el._id}>
                                            <Text>{el.name}:</Text>
                                            <Text>{el.quantity}x100g</Text>
                                        </Flex>
                                    );
                                })}
                            </Box>
                        );
                    })}
                </Flex>
            </Flex>
            <Flex direction={'column'} width="100%">
                {data.data?.map((item, index) => {
                    return (
                        <Flex
                            key={index}
                            direction="column"
                            gap={'10px'}
                            borderBottom="1px solid lightGray"
                            padding={'5px 0px'}
                        >
                            <Text>
                                <strong>B?????c {index + 1}</strong>: {item.content}
                            </Text>
                            <Flex overflowX={'scroll'} gap="5px 10px">
                                {item.img?.map((el, index) => {
                                    return (
                                        <Box key={index} width="100px" height={'100px'} flexShrink="0">
                                            <Image src={el as string} width="100px" height="100px" alt={item.content} />
                                        </Box>
                                    );
                                })}
                            </Flex>
                        </Flex>
                    );
                })}
            </Flex>
        </Flex>
    );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id;
    const result = await RecipeApis.getDetailRecipe(id as string);
    return {
        props: {
            data: result.data,
        },
    };
};
// export const getStaticPaths: GetStaticPaths = async () => {
//     const result = await RecipeApis.getAllRecipe(0);
//     const paths = result.data.map((item) => ({
//         params: {
//             id: item._id as string,
//         },
//     }));
//     return { paths, fallback: false };
// };
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const id = params?.id;
//     const result = await RecipeApis.getDetailRecipe(id as string);
//     return {
//         props: {
//             data: result.data,
//         },
//         revalidate: 5,
//     };
// };
export default DetailRecipe;
