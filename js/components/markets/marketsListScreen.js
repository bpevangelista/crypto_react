/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MarketsTopBar from './marketsTopBar';

import * as actions from '../../actions/marketsActions';
import type { MarketItemType, MarketsStoreType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262D35',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  listRow: {
    flex: 1,
    flexDirection:'row',
    padding: 4,
    height:40,
  },
  textRank: {
    color: 'white',
    fontSize: 13,
    fontWeight: '100',
    textAlign: 'center',
    width: 26,
  },
  textTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '100',
  },
  textBase: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  columnRank: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRightColor: 'slategray',
    borderRightWidth: 0.5,
    paddingLeft: 4,
    paddingRight: 2,
  },
  columnTitle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 6,
  },
  columnValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 6,
  },
  columnPercentage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius:10,
    borderWidth: 1,
  },
});

type MarketsListScreenProps = {
  actions: {
    fetchMarkets: () => void,
    showMarketDetails: (item: MarketItemType) => void,
  },
  markets: MarketsStoreType
}

class MarketsListScreen extends React.Component<MarketsListScreenProps, {}> {
  constructor(props) {
    super(props);
  }

  onRowPressed(index: number, item: MarketItemType) {
    this.props.actions.showMarketDetails(item);
  }

  formatCurrency(value: string) {
    let newValue = parseFloat(parseFloat(value).toFixed(6)).toFixed(2).toString();
    return newValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  listRowRender(info: {index: number, item: MarketItemType}) {
    let item = info.item;
    let backgroundColor = (parseInt(item.rank) % 2 === 0)? '#161A1D' : '#1E2126';
    let percColor = (parseFloat(item.percent_change_24h) >= 0)? 'green' : 'red';

    return (
      <TouchableHighlight underlayColor='black' onPress={() =>
        this.onRowPressed(info.index, info.item)}>
        <View style={[styles.listRow, {backgroundColor}]}>
          <View style={styles.columnRank}>
            <Text style={styles.textRank}>{item.rank}</Text>
          </View>
          <View style={styles.columnTitle}>
            <Text style={styles.textTitle}>{item.name} {item.symbol}</Text>
          </View>
          <View style={styles.columnValue}>
            <Text style={styles.textBase}>{this.formatCurrency(item.price_usd)}</Text>
          </View>
          <View style={[styles.columnPercentage, {backgroundColor: percColor}]}>
            <Text style={styles.textBase}>{item.percent_change_24h}%</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let markets = this.props.markets;
    return(
      <SafeAreaView style={styles.container}>

        <MarketsTopBar />

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
