import React from 'react';
import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';

interface NavigationModel {
    token: string;
    onLogout: Function;
}

const Navigation = ({ token, onLogout }: NavigationModel) => {
    return (
        <Flex bg={'lightGray'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding="5px 10px">
            <Box width="20%" height="100%">
                <Box width="24px" height="24px" cursor="pointer" className={styles.img}>
                    <Link href={'/'}>
                        <a>
                            <Image src={'/images/crate.png'} width="24px" height="24px" alt="Ingredient" />
                        </a>
                    </Link>
                </Box>
            </Box>
            <Box>
                <Wrap>
                    {token ? (
                        <WrapItem>
                            <span onClick={() => onLogout()}>
                                <a>Đăng xuất</a>
                            </span>
                        </WrapItem>
                    ) : (
                        <>
                            {' '}
                            <WrapItem>
                                <Link href="/login">
                                    <a>Đăng nhập</a>
                                </Link>
                            </WrapItem>
                            <WrapItem>
                                <Link href="/register">
                                    <a>Đăng ký</a>
                                </Link>
                            </WrapItem>
                        </>
                    )}
                </Wrap>
            </Box>
        </Flex>
    );
};

export default Navigation;
