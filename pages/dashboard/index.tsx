import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthApis from '../../api/Auth';
import { RootState } from '../../redux/Reducers';
import Router from 'next/router';
import { GetStaticProps, GetStaticPaths, NextPageContext } from 'next';
import * as cookie from 'cookie';
import cookies from 'next-cookies';
import axios from 'axios';
import Link from 'next/link';
const HomeDashboard = () => {
    return (
        <div>
            <Link href={'/dashboard/recipe/edit/2610comchien1645799213239'}>
                <a>Check</a>
            </Link>
            <Link href={'/dashboard/recipe/create'}>
                <a>Create</a>
            </Link>
        </div>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const { refresh_token } = cookies(ctx);
    try {
        const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/refresh_token`, {
            headers: {
                Cookie: refresh_token as string,
            },
        });

        return {
            props: {},
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default HomeDashboard;
