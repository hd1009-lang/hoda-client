import React from 'react';

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


interface LayoutProps {
    children: React.ReactNode;
}
const WrapProvider = ({ children }: LayoutProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export default WrapProvider;
