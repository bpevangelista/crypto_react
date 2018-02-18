import * as actions from '../actions/actions'

const defaultState = {
  items: [],
  itemDetails: null,
  refreshing: false,
};

const marketsReducer = (state = defaultState, action) => {
  let newState = null;

  switch (action.type) {
    case actions.FETCH_MARKETS_PENDING:
      newState = Object.assign({}, state, {
        refreshing: true
      });
    break;

    case actions.FETCH_MARKETS_FULFILLED:
      newState = Object.assign({}, state, {
        items: action.payload, refreshing: false
      });
    break;

    case actions.FETCH_MARKETS_ERROR:
      newState = Object.assign({}, state, {
        refreshing: false
      });
    break;

    // TODO e.g. completeItem = false
    case actions.FETCH_MARKET_DETAILS_PENDING:
      newState = Object.assign({}, state, {
        itemDetails: action.payload
      });
    break;

    // TODO e.g. completeItem = true
    case actions.FETCH_MARKET_DETAILS_FULFILLED:
      newState = Object.assign({}, state, {
        itemDetails: action.payload
      });
    break;
  }

  return newState || state;
}

export default marketsReducer;
