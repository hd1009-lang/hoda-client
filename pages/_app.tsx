import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import theme from '../lib/theme';
import WrapProvider from '../redux/store';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import Loading from '../components/Loading/Loading';
function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);
    return (
        <WrapProvider>
            <ChakraProvider theme={theme}>
                <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
            </ChakraProvider>
        </WrapProvider>
    );
}

export default MyApp;
