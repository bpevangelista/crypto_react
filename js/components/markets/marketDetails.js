/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
//import { VictoryChart, VictoryArea } from 'victory-native';
import Icon from 'react-native-vector-icons/Entypo';

import * as actions from '../../actions/marketsActions';
import type { MarketItemDetailsType } from '../../types';

type MarketDetailsProps = {
  itemDetails: MarketItemDetailsType,
};

class MarketDetailsScreen extends React.Component<MarketDetailsProps, void> {
  static navigationOptions = (options) => ({
    title: options.navigation.state.params.title,
  });

  constructor(props) {
    super(props);
  }

  prettifyValue(val) {
    //let DIG9 = 100000000;
    //let DIG6 = 100000;
    let BI = 1000000000;
    let MI = 1000000;
    let valInt = parseFloat(val);

    if (valInt >= BI) {
      return (valInt / BI).toFixed(3) + 'B';
    } else if (valInt >= MI) {
      return (valInt / MI).toFixed(3) + 'M';
    } else {
      return '' + parseFloat(valInt.toFixed(7));
    }
  }

  render() {
    let item = this.props.itemDetails;

    let graphStyle = {
      data: {
        fill: "#c43a31"
      }
    };
    let graphSamples = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 },
    ];

    return (
      <SafeAreaView style={styles.container}>

      {/*
      <VictoryChart>
        <VictoryArea style={graphStyle} data={graphSamples} />
      </VictoryChart>
      */}

        <View style={styles.block}>
          <View style={styles.detailsLine}>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Price</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>${item.price_usd}</Text>
            </View>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Change 24h</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>{item.percent_change_24h}%</Text>
            </View>
          </View>
          <View style={styles.line}/>

          <View style={styles.detailsLine}>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Price BTC</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>{this.prettifyValue(item.price_btc)}</Text>
            </View>
            <View style={styles.columnLeft}>
              {/*<Text style={styles.textName}>Change 24h</Text>*/}
            </View>
            <View style={styles.columnRight}>
              {/*<Text style={styles.textValue}>-31.63%</Text>*/}
            </View>
          </View>
          <View style={styles.line}/>

          <View style={styles.detailsLine}>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>High 24h</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>${item.price_usd}</Text>
            </View>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Low 24h</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>${item.price_usd}</Text>
            </View>
          </View>
          <View style={styles.line}/>

          {
          // <View style={styles.detailsLine}>
          //   <View style={styles.columnLeft}>
          //     <Text style={styles.textName}>High 7d</Text>
          //   </View>
          //   <View style={styles.columnRight}>
          //     <Text style={styles.textValue}>19,325.87</Text>
          //   </View>
          //   <View style={styles.columnLeft}>
          //     <Text style={styles.textName}>Low 7d</Text>
          //   </View>
          //   <View style={styles.columnRight}>
          //     <Text style={styles.textValue}>325.87</Text>
          //   </View>
          // </View>
          // <View style={styles.line}/>
          }

          <View style={styles.detailsLine}>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Vol 24h</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>{this.prettifyValue(item['24h_volume_usd'])}</Text>
            </View>
            <View style={styles.columnLeft}>
              <Text style={styles.textName}>Mkt Cap</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.textValue}>{this.prettifyValue(item.market_cap_usd)}</Text>
            </View>
          </View>
          <View style={styles.line}/>

        </View>
      </SafeAreaView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'black',
  },
  block: {
    backgroundColor: 'powderblue',
  },
  detailsLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10,
    height: 32,
  },
  columnLeft: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  columnRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  textName: {
    fontSize: 13,
    fontWeight: '100',
  },
  textValue: {
    fontSize: 16,
  },
  line: {
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

const mapStoreToProps = (store) => ({
    itemDetails: store.markets.itemDetails,
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStoreToProps, mapDispatchToProps)(MarketDetailsScreen);
