import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../components/appNavigator'

import * as actions from '../actions/actions'

// The below doesn't work, there's a bug where it pushes two items to stack
// https://github.com/react-navigation/react-navigation/issues/1498
//
//const ACTION_MARKETS = AppNavigator.router.getActionForPathAndParams('Markets/MarketsList');
//const defaultState = AppNavigator.router.getStateForAction(ACTION_MARKETS);

const DEFAULT_ROUTE = 'MarketsList';
const defaultState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({routeName: DEFAULT_ROUTE}));

const navigationReducer = (state = defaultState, action) => {
  let nextState = null;

  switch (action.type) {
    case actions.FETCH_MARKET_DETAILS_PENDING:
      let nav = {
        routeName: 'MarketDetails',
        params: {
          title: `${action.payload.name} (${action.payload.symbol})`,
        },
      };

      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate(nav));
    break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navigationReducer;
