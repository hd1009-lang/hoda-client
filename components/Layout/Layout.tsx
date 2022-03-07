import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Reducers';
import { GetAccessToken } from '../../redux/Actions/Auth.action';
import AuthApis from '../../api/Auth';
import { AuthCommand } from '../../redux/Command/Auth.command';
import Toast from '../Toast/Toast';
import Navigation from '../Navigation/Navigation';
import IngredientApis from '../../api/Ingredient';
import { IngredientCommand } from '../../redux/Command/Ingredient.command';
import Cookie from 'js-cookie';
interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    const dispatch = useDispatch();
    const { login, token } = useSelector((state: RootState) => state.auth);
    const ingredients = useSelector((state: RootState) => state.ingredients);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!ingredients[0]._id) {
            // setLoading(true);
            const getIngredient = async () => {
                const result = await IngredientApis.getCate();
                dispatch({ type: IngredientCommand.GET_CATE, payload: result });
                setLoading(false);
            };
            getIngredient();
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin');
        if (isLogin) {
            dispatch(GetAccessToken());
        }
    }, [dispatch]);
    useEffect(() => {
        if (login) {
            // setLoading(true);
            dispatch(GetAccessToken());
            // setLoading(false);
        }
    }, [dispatch, login]);

    const onLogout = () => {
        Cookie.remove('refresh_token');
        AuthApis.logout();
        dispatch({ type: AuthCommand.Logout });
    };
    return (
        <Box width="100%" height="100vh" minWidth={'300px'} overflow="hidden" position="relative">
            <Navigation token={token} onLogout={onLogout} />
            <Box width={'100%'} position="relative">
                {/* {loading && <div>Loading....</div>} */}
                {children}
                <Toast />
            </Box>
        </Box>
    );
};

export default Layout;
