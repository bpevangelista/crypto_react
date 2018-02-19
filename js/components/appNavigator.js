/* @flow */
import React from 'react';
import { Platform } from 'react-native';
import { Provider, connect } from 'react-redux'
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconZO from 'react-native-vector-icons/Zocial';

import { MarketsScreen, CoinfolioScreen, TrendingScreen } from './';

const StockRoutes = {
  Markets: {
    screen: MarketsScreen,
    navigationOptions: {
			title: "Markets",
      tabBarIcon: ({ tintColor }) => <IconFA name="home" size={22}/>,
    }
  },
  Coinfolio: {
    screen: CoinfolioScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <IconZO name="bitcoin" size={22}/>,
    }
  },
  Trending: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <IconFA name="line-chart" size={22}/>,
    }
  },
  News: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <IconFA name="newspaper-o" size={22}/>,
    }
  },
  Settings: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <IconFA name="cog" size={22}/>,
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
  let incompleteNav = {
    dispatch,
    state: nav,
    addListener: createReduxBoundAddListener('navKey')
  };

  let navigation = addNavigationHelpers(incompleteNav);
  return (
    <AppNavigator navigation={navigation} />
  );
};

const mapStoreToProps = (store) => ({
  nav: store.nav
});

// Passes dispatch and each key on mapStateToProps (e.g. nav) to AppWithReduxNavigation
export default connect(mapStoreToProps)(AppWithReduxNavigation);
