import { AppNavigator } from '../components/appNavigator'
//import { AppNavigator } from '../app'

const ACTION_MARKETS = AppNavigator.router.getActionForPathAndParams('Markets');

const defaultState = AppNavigator.router.getStateForAction(ACTION_MARKETS);

const navigationReducer = (state = defaultState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navigationReducer;
