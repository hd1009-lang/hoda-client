import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import theme from '../lib/theme';
import WrapProvider from '../redux/store';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WrapProvider>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </WrapProvider>
    );
}

export default MyApp;
