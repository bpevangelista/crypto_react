/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
//import Icon from 'react-native-vector-icons/Entypo';
import Icon from '@expo/vector-icons/Entypo';

import styles from './styles';
import * as actions from '../actions/markets';

/*
let listData = [{
    "key": "bitcoin", "id": "bitcoin", "name": "Bitcoin", "symbol": "BTC", "rank": "1", "price_usd": "11305.2",
    "price_btc": "1.0", "24h_volume_usd": "13947800000.0", "market_cap_usd": "190058070722", "percent_change_1h": "0.99", "percent_change_24h": "-2.11", "percent_change_7d": "-17.14", "last_updated": "1516335565",
    "color": "powderblue",
  }, {
    "key": "bitcoin2", "id": "bitcoin", "name": "Bitcoin", "symbol": "BTC", "rank": "1", "price_usd": "11305.2",
    "price_btc": "1.0", "24h_volume_usd": "13947800000.0", "market_cap_usd": "190058070722", "percent_change_1h": "0.99", "percent_change_24h": "-2.11", "percent_change_7d": "-17.14", "last_updated": "1516335565",
    "color": "skyblue",
  },
];
*/

type MarketItemType = {
  id: string,
  rank: string,
  name: string,
  symbol: string,
  price_usd: string,
  percent_change_24h: string,
  color: string
};

type MarketScreenType = {
  fetchMarkets: () => void,
  markets: {
    items: Array<MarketItemType>,
    refreshing: boolean,
  }
}

class MarketRow extends React.PureComponent<MarketItemType, void> {
  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props;
    let itemColor = (parseInt(item.rank) % 2 === 0)? 'powderblue' : 'skyblue';
    return (
      <TouchableHighlight onPress={() => Alert.alert('Touched') } underlayColor='black'>
      <View style={[styles.listCell, {backgroundColor: itemColor}]}>
        <View style={styles.flexRow}>
          <Text style={{width:26}}>{item.rank}</Text>
          <Text>|  ({item.symbol}) {item.name}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={{width:64}}>{item.percent_change_24h}%</Text>
          <Text style={{color: 'green', width:96}}>${item.price_usd}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

class MarketsScreen extends React.Component<MarketScreenType, void> {
  constructor(props) {
    super(props);
    console.log('aaa', props);
  }

  listRowRender(info: {item: MarketItemType}) {
    return (
      <MarketRow {...info.item} />
    );
  }

  render() {
    let markets = this.props.markets;
    return(
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.list} data={markets.items}
          keyExtractor={(item, index) => item.id}
          renderItem={this.listRowRender}
          initialNumToRender={16}
          onRefresh={this.props.fetchMarkets}
          refreshing={markets.refreshing}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = storeState => ({
  markets: storeState.markets
});
const mapDispatchToProps = dispatch => ({
  fetchMarkets: () => {
    dispatch(actions.fetchMarkets(dispatch));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketsScreen);
