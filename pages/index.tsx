import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Reducers';
import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import BoxBMI from '../components/Bmi/BoxBMI';
import { GetInfo } from '../redux/Actions/Auth.action';
import NavBar from '../components/NavBar/NavBar';
import { RecipeModel } from '../Type/Recipe';
import RecipeApis from '../api/Recipe';
import Link from 'next/link';
import BoxRecipe from '../components/Recipe/BoxRecipe';
interface HomeLayout {
    ListRecipe: RecipeModel[];
}
const Home: NextPage<HomeLayout> = ({ ListRecipe }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: RootState) => state.auth.user);
    const ingredients = useSelector((state: RootState) => state.ingredients);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (token) {
            if (!user.bmiId.bmi) {
                dispatch(GetInfo());
            }
            setLoading((loading) => !loading);
        } else {
            setLoading((loading) => !loading);
        }
    }, [dispatch, token, user.bmiId.bmi]);
    if (loading) {
        return (
            <Box width={'100%'} height={'100vh'}>
                Loading
            </Box>
        );
    }

    return (
        <Flex direction={'column'} width="100%" height={'100vh'}>
            <Head>
                <title>HodaTheFood</title>
                <meta name="description" content="Make your suitable food" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {token && user.bmiId.bmi! < 10 && <BoxBMI />}
            <Flex width={'100%'} height="100vh">
                {ListRecipe ? (
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
                        {ListRecipe.map((recipe) => {
                            return <BoxRecipe key={recipe._id} data={recipe} />;
                        })}
                    </Flex>
                ) : (
                    <div>Loading....</div>
                )}
            </Flex>
        </Flex>
    );
};

export async function getStaticProps() {
    const result = await RecipeApis.getAllRecipe(0);
    return { props: { ListRecipe: result.data }, revalidate: 5 };
}
export default Home;
