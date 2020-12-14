import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#139bfe',
        error: () => '#ff0005',
    },
});

const devtools = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
const composeEnchancers = devtools || compose;

const enhancedStore = composeEnchancers(applyMiddleware(loggerMiddleware));

export { enhancedStore };
