import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools'
const breakpoints = createBreakpoints({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  })
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
};
const fonts = {
    heading: 'K2D',
    body: 'K2D',
};
const colors = {
    lightGray: '#EEEEEE',
    lightSuccess: '#C1F4C5',
    lightError: '#F2789F',
};
const theme = extendTheme({ config, colors, fonts,breakpoints });
export default theme;
