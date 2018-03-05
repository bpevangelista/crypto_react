import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import * as actions from './actions/actions'
import reducers from './reducers/reducers'

// react-navigation
const getNavFromState = state => state.nav;
const reactNavigation = createReactNavigationReduxMiddleware('navKey', getNavFromState);

const logger = createLogger();
const middlewares = applyMiddleware(thunk, reactNavigation, logger);

// Remove logger from release
//const middlewares = applyMiddleware(thunk, reactNavigation);

const store = createStore(reducers, middlewares);
store.dispatch(actions.fetchMarkets());

export default store;
