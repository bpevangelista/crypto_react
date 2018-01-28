import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../components/appNavigator'

// The below doesn't work, there's a bug where it pushes two items to stack
// https://github.com/react-navigation/react-navigation/issues/1498
//const ACTION_MARKETS = AppNavigator.router.getActionForPathAndParams('Markets/MarketsList');
//const defaultState = AppNavigator.router.getStateForAction(ACTION_MARKETS);

const DEFAULT_ROUTE = 'Markets/MarketsList';
const defaultState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({routeName: DEFAULT_ROUTE}));

const navigationReducer = (state = defaultState, action) => {
  let nextState = null;
  switch (action.type) {
    case 'FETCH_MARKET_DETAILS_PENDING':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate(
          {routeName:'MarketDetails', params: { item: action.payload }}));
    break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
};

export default navigationReducer;
