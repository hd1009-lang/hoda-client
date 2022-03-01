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
        console.log({ ListRecipe });

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
            <Box width={'100%'} height={'100vh'} bg="tomato">
                Loading
            </Box>
        );
    }

    return (
        <Flex direction={'column'} width="100%" height={'100vh'} bg="purple.100">
            <Head>
                <title>HodaTheFood</title>
                <meta name="description" content="Make your suitable food" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {token && user.bmiId.bmi! < 10 && <BoxBMI />}
            <Flex width={'100%'} height="100vh">
                {/* <Box width={'300px'} height="100%" bg="pink.100" overflow={'scroll'}>
                    {ingredients.length > 1 ? <NavBar ingredients={ingredients} /> : <div>Loading....</div>}
                </Box> */}

                {ListRecipe ? (
                    <Flex
                        width={'100%'}
                        height="95%"
                        direction={['column', 'column', 'row']}
                        justifyContent="flex-start"
                        alignItems={['center', 'center', 'flex-start']}
                        gap="5px"
                        overflow={'scroll'}
                        bg="red.100"
                        padding={'10px'}
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
    return { props: { ListRecipe: result.data },revalidate: 60*60*12 };
}
export default Home;
