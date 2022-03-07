import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LayoutDashboard from '../../components/Layout/LayoutDashboard';
import { RecipeModel } from '../../Type/Recipe';
import RecipeApis from '../../api/Recipe';
import { Flex } from '@chakra-ui/react';
import BoxRecipe from '../../components/Recipe/BoxRecipe';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Reducers';
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
                <Link href={'/dashboard/recipe/edit/2610comchien1645799213239'}>
                    <a>Check</a>
                </Link>
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
                        return <BoxRecipe key={recipe._id} data={recipe} />;
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
