import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './loading.module.css';
import { Box, Flex } from '@chakra-ui/react';
const Loading = () => {
    useEffect(() => {
        const id = setInterval(reset_animation, 3000);
        return () => clearInterval(id);
    }, []);
    function reset_animation() {
        var list = document.querySelectorAll('img');
        list.forEach((el) => {
            el.style.animation = 'none';
            // eslint-disable-next-line no-unused-expressions
            el.offsetHeight; /* trigger reflow */
            el.style.animation = '';
        });
    }
    return (
        <Flex
            width={'100%'}
            flexDirection={['column', 'row']}
            height="100vh"
            justifyContent="space-around"
            alignItems={'center'}
            bg="yellow.200"
        >
            <div className={`${styles.dot} ${styles.dot1}`}>
                <Image
                    width={'50px'}
                    height={'50px'}
                    src="/images/loading/dot.png"
                    alt=""
                    className={`${styles.img1}`}
                    priority
                />
                <Image layout="fill" src="/images/loading/earth.png" alt="" className={styles.img2} />
            </div>
            <div className={`${styles.dot} ${styles.dot2}`}>
                <Image
                    width={'50px'}
                    height={'50px'}
                    src="/images/loading/custom.png"
                    alt=""
                    className={styles.img1}
                    priority
                />
                <Image layout="fill" src="/images/loading/snail.png" alt="" className={styles.img2} />
            </div>
            <div className={`${styles.dot} ${styles.dot3}`}>
                <Image
                    width={'150px'}
                    height={'150px'}
                    src="/images/loading/bleach.png"
                    alt=""
                    className={styles.img1}
                    priority
                />
                <Image layout="fill" src="/images/loading/paw.png" alt="" className={styles.img2} />
            </div>
            <div className={`${styles.dot} ${styles.dot4}`}>
                <Image
                    width={'50px'}
                    height={'50px'}
                    src="/images/loading/dot.png"
                    alt=""
                    className={styles.img1}
                    priority
                />
                <Image layout="fill" src="/images/loading/farmer.png" alt="" className={styles.img2} />
            </div>
            <div className={`${styles.dot} ${styles.dot5}`}>
                <Image
                    width={'50px'}
                    height={'50px'}
                    src="/images/loading/hexagon.png"
                    alt=""
                    className={styles.img1}
                    priority
                />
                <Image layout="fill" src="/images/loading/potato.png" alt="" className={styles.img2} />
            </div>
        </Flex>
    );
};

export default Loading;
