import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import * as actions from './actions/actions'
import reducers from './reducers/reducers'

const logger = createLogger();
const middlewares = applyMiddleware(thunk, logger);

const store = createStore(reducers, middlewares);
store.dispatch(actions.fetchMarkets());

export default store;
