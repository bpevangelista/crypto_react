/* @flow */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MarketsListScreen from './marketsListScreen';
import MarketDetailsScreen from './marketDetailsScreen';

const MarketsNavigator = StackNavigator({
  MarketsList: {
    screen: MarketsListScreen,
    navigationOptions: {
      header: null,
    }
  },
  MarketDetails: {
    screen: MarketDetailsScreen,
    navigationOptions : {
      //title: ''
    }
  },
}, {
  headerMode: 'screen',
  //headerMode: 'none',
  navigationOptions: {
  },
  initialRouteName: 'MarketsList'
});

export default MarketsNavigator;
