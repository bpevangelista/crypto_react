/* @flow */
import React from 'react';
import { Provider, connect } from 'react-redux'
import { Platform } from 'react-native';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Entypo';
import { MarketsScreen, CoinfolioScreen, TrendingScreen } from './components';

const StockRoutes = {
  Markets: {
    screen: MarketsScreen,
    navigationOptions: {
			title: "Markets",
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={22}/>,
    }
  },
  Coinfolio: {
    screen: CoinfolioScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="wallet" size={22}/>,
    }
  },
  Trending: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="line-graph" size={22}/>,
    }
  },
  News: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="news" size={22}/>,
    }
  },
  Settings: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="cog" size={22}/>,
    }
  },
};

export const AppNavigator = TabNavigator(StockRoutes, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
  },
});

// Links redux store nav to the navigation
const AppWithReduxNavigation = ({dispatch, nav}) => {
  let incompleteNav = { dispatch, state: nav };
  let navigation = addNavigationHelpers(incompleteNav);
  return (
    <AppNavigator navigation={navigation} />
  );
};

const mapStateToProps = storeState => ({
  nav: storeState.nav
});

// Passes dispatch and each key on mapStateToProps (e.g. nav) to AppWithReduxNavigation
export default connect(mapStateToProps)(AppWithReduxNavigation);
