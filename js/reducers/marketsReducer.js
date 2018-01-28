import * as actions from '../actions/actions'

const defaultState = {
  items: [],
  refreshing: false,
};

const marketsReducer = (state = defaultState, action) => {
  let newState = null;

  if (action.type === actions.FETCH_MARKETS_PENDING) {
    newState = Object.assign({}, state, {refreshing: true});
  } else if (action.type === actions.FETCH_MARKETS_FULFILLED) {
    newState = Object.assign({}, {items: action.payload, refreshing: false});
  }

  return newState || state;
}

export default marketsReducer;
