/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

import * as actions from '../../actions/marketsActions';
import type { MarketItemType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row'
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  listCell: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height:40,
  },
});

type MarketsListScreenProps = {
  actions: {
    fetchMarkets: () => void,
    showMarketDetails: (item: MarketItemType) => void,
  },
  markets: {
    items: Array<MarketItemType>,
    refreshing: boolean,
  }
}

class MarketsListScreen extends React.Component<MarketsListScreenProps, void> {
  constructor(props) {
    super(props);
  }

  onRowPressed(index: number, item: MarketItemType) {
    //Alert.alert('Touched: ' + this.props.id);
    this.props.actions.showMarketDetails(item);
  }

  listRowRender(info: {index: number, item: MarketItemType}) {
    let item = info.item;
    let itemColor = (parseInt(item.rank) % 2 === 0)? 'powderblue' : 'skyblue';
    return (
      <TouchableHighlight underlayColor='black' onPress={() =>
        this.onRowPressed(info.index, info.item)}>
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

  render() {
    let markets = this.props.markets;
    return(
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.list} data={markets.items}
          keyExtractor={(item, index) => item.id}
          renderItem={(info) => this.listRowRender(info)}
          initialNumToRender={16}
          onRefresh={this.props.actions.fetchMarkets}
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
  actions: {
    fetchMarkets: () => {
      dispatch(actions.fetchMarkets(dispatch));
    },
    showMarketDetails: (item) => {
      dispatch(actions.showMarketDetails(item));
    }
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketsListScreen);
