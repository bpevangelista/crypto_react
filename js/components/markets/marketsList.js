/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
//import Icon from 'react-native-vector-icons/Entypo';
import Icon from '@expo/vector-icons/Entypo';

import styles from '../styles';
import * as actions from '../../actions/marketsActions';

type MarketItemType = {
  id: string,
  rank: string,
  name: string,
  symbol: string,
  price_usd: string,
  percent_change_24h: string,
  color: string
};

// class MarketRow extends React.PureComponent<MarketItemType, void> {
//   constructor(props) {
//     super(props);
//   }
//
//   onRowPressed() {
//     //Alert.alert('Touched: ' + this.props.id);
//     props.showMarketDetails(this.props.id);
//   }
//
//   render() {
//     let item = this.props;
//     let itemColor = (parseInt(item.rank) % 2 === 0)? 'powderblue' : 'skyblue';
//     return (
//       <TouchableHighlight onPress={() => this.onRowPressed()} underlayColor='black'>
//       <View style={[styles.listCell, {backgroundColor: itemColor}]}>
//         <View style={styles.flexRow}>
//           <Text style={{width:26}}>{item.rank}</Text>
//           <Text>|  ({item.symbol}) {item.name}</Text>
//         </View>
//         <View style={styles.flexRow}>
//           <Text style={{width:64}}>{item.percent_change_24h}%</Text>
//           <Text style={{color: 'green', width:96}}>${item.price_usd}</Text>
//         </View>
//       </View>
//       </TouchableHighlight>
//     );
//   }
// }

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

  // listRowRender(info: {item: MarketItemType}) {
  //   console.log(this.props);
  //   return (
  //     <MarketRow {...info.item} />
  //   );
  // }

  onRowPressed(item: MarketItemType) {
    //Alert.alert('Touched: ' + this.props.id);
    this.props.actions.showMarketDetails(item);
  }

  listRowRender(info: {item: MarketItemType}) {
    //let itemIndex = info.index;
    let item = info.item;
    let itemColor = (parseInt(item.rank) % 2 === 0)? 'powderblue' : 'skyblue';
    return (
      <TouchableHighlight onPress={() => this.onRowPressed(item)} underlayColor='black'>
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
