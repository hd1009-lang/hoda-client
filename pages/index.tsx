import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Reducers';
import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import BoxBMI from '../components/Bmi/BoxBMI';
import { GetInfo } from '../redux/Actions/Auth.action';
const Home: NextPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: RootState) => state.auth.user);
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
        console.log(user.bmiId.bmi);
    }, [token]);
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
            <Box width={200} height="200px" mt={20}>
                Welcome to Vietnam
            </Box>
        </Flex>
    );
};

export default Home;
