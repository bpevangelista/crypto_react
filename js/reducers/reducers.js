import { combineReducers } from 'redux'
import marketsReducer from './marketsReducer'
import navReducer from './navReducer'

const reducers = combineReducers({
  nav: navReducer,
  markets: marketsReducer,
});

export default reducers;
