/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import * as actions from '../../actions/marketsActions';
import type { MarketsSortAndFilterType } from '../../types';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //paddingBottom: 4,
    //paddingLeft: 4,
    //paddingRight: 4,
    padding: 6,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    borderColor: '#202020',
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
  rightBar: {
    flex: 0.2,
    flexDirection: 'row',
    height: 40,
    padding: 10,
  },
  rightBar: {
    flex: 0.4,
    flexDirection: 'row',
    height: 40,
    padding: 10,
  },
});

type MarketsTopBarProps = {
  filterAndSort: MarketsSortAndFilterType
};

type MarketsTopBarState = {
  filterText: string
};

class MarketsTopBar extends React.Component<MarketsTopBarProps, MarketsTopBarState> {
  constructor(props) {
    super(props);

    this.state = {
      filterText: props.sortAndFilter.filterText,
    }
  }

  onSearchChanged(text: string) {
    this.setState({filterText: text});

    // action update
    // if char >=3 wait 1s to dispatch search, reset on type
  }

  render() {
    return(
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <TextInput style={{flex: 1, color: 'white'}}
            placeholder='Search...'
            placeholderTextColor='gray'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={false}
            keyboardType='default'
            value={this.state.filterText}
            onChangeText={(text) => this.onSearchChanged(text)} />
        </View>

        <View style={styles.rightBar}>
          <Text>All</Text>
        </View>
        <View style={styles.rightBar}>
          <Text>Favorites</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = storeState => ({
  sortAndFilter: storeState.markets.sortAndFilter
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
export default connect(mapStateToProps, mapDispatchToProps)(MarketsTopBar);
