// core
import React from "react";

// library
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// components
import { store,  persistor} from '../redux';


// assets
import '../styles/globals.scss'
import 'swiper/swiper.scss';

// This component is needed for global styles on all pages
function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp
