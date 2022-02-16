import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.css';
import { RootState } from '../redux/Reducers';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
const Home: NextPage = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (token) {
            setLoading((loading) => !loading);
        } else {
            setLoading((loading) => !loading);
        }
    }, [token]);
    if (loading) {
        return (
            <Box width={'100%'} height={'100vh'} bg="tomato">
                Loading
            </Box>
        );
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>HodaTheFood</title>
                <meta name="description" content="Make your suitable food" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {token ? <div>Hello world</div> : <div>Let{"'"}s the game begin</div>}
        </div>
    );
};

export default Home;
