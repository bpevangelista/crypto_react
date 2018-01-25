import { combineReducers } from 'redux'
import marketsReducer from './markets'
import navigationReducer from './navigation'

const reducers = combineReducers({
  nav: navigationReducer,
  markets: marketsReducer,
});

export default reducers;
