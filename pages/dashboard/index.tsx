import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LayoutDashboard from '../../components/Layout/LayoutDashboard';
import { RecipeModel } from '../../Type/Recipe';
import RecipeApis from '../../api/Recipe';
import { Box, Flex } from '@chakra-ui/react';
import BoxRecipe from '../../components/Recipe/BoxRecipe';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import data from '../../components/Bmi/data';
const HomeDashboard = () => {
    const [listRecipe, setListRecipe] = useState<RecipeModel[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        if (!loading) {
            return;
        }
        const getDate = async () => {
            setLoading(true);
            const result = await RecipeApis.getListOfUser(0);
            if (result.data) {
                setListRecipe(result.data);
                setLoading(false);
            }
        };
        if (token) {
            getDate();
        }
    }, [loading, token]);
    return (
        <LayoutDashboard>
            <Flex direction={'column'} width={'100%'} height="100vh" overflow={'scroll'}>
                <Link href={'/dashboard/recipe/create'}>
                    <a>Create</a>
                </Link>
                <Flex
                    width={'100%'}
                    height="95%"
                    direction={['column', 'row', 'row']}
                    justifyContent="flex-start"
                    alignItems={['center', 'center', 'flex-start']}
                    wrap={['nowrap', 'wrap', 'wrap']}
                    alignContent="flex-start"
                    overflow={'scroll'}
                    padding={'10px 20px'}
                    gap="10px 0"
                >
                    {listRecipe.map((recipe) => {
                        return (
                            <Flex direction={'column'} width="20%" height={'200px'} key={recipe._id} gap={'10px 0'}>
                                <Box width={'100%'} height="80%" position="relative">
                                    <Image
                                        src={recipe.img as string}
                                        layout="fill"
                                        alt={recipe.title}
                                        objectFit={'contain'}
                                    />
                                </Box>
                                <Link href={`/dashboard/recipe/edit/${recipe._id}`}>
                                    <a>{recipe.title}</a>
                                </Link>
                            </Flex>
                        );
                    })}
                </Flex>
            </Flex>
        </LayoutDashboard>
    );
};

// export async function getServerSideProps(ctx: NextPageContext) {
//     const { refresh_token } = cookies(ctx);
//     try {
//         const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/refresh_token`, {
//             headers: {
//                 Cookie: refresh_token as string,
//             },
//         });

//         return {
//             props: {},
//         };
//     } catch (error) {
//         return {
//             notFound: true,
//         };
//     }
// }

export default HomeDashboard;
