import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
};
const fonts = {
    heading: 'Public Sans',
    body: 'Public Sans',
};
const colors = {
    lightGray: '#EEEEEE',
};
const theme = extendTheme({ config, colors, fonts });
export default theme;
