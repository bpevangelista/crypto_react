/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import * as actions from '../../actions/marketsActions';
import { MarketSortTypes } from '../../types';
import type { MarketsFilterAndSortType } from '../../types';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  searchBar: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: '#202020',
    borderColor: '#202020',
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    padding: 4,
  },
  rightBar: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderButton: {
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
  },
  rightBar2: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
  },
});

type MarketsTopBarProps = {
  filterAndSort: MarketsFilterAndSortType,
  actions: {
    filterAndSortMarkets: (filterAndSort: MarketsFilterAndSortType) => void,
    sortMarkets: (filterAndSort: MarketsFilterAndSortType) => void,
  }
};

type MarketsTopBarState = {
  filterAndSort: MarketsFilterAndSortType,
  searchTimeout : ?TimeoutID,
  searchDispatched: boolean,
};

class MarketsTopBar extends React.Component<MarketsTopBarProps, MarketsTopBarState> {
  constructor(props) {
    super(props);

    this.state = {
      filterAndSort: props.filterAndSort,
      searchTimeout: null,
      searchDispatched: false,
    }
  }

  componentWillUnmount() {
    if (this.state.searchTimeout !== null) {
      clearTimeout(this.state.searchTimeout);
    }
  }

  dispatchSearch() {
    if (!this.state.searchDispatched) {
      this.setState({searchDispatched: true});

      // Dispatch
      this.props.actions.filterAndSortMarkets(this.state.filterAndSort);
      //Alert.alert('Alert Title', this.state.filterAndSort.filterText);
    }
  }

  onSearchChanged(text: string) {
    // Dispatch after search settles for 500ms
    if (this.state.searchTimeout !== null) {
      clearTimeout(this.state.searchTimeout);
    }
    let searchTimeout = setTimeout(() => this.dispatchSearch(), 250);

    this.setState({
      filterAndSort: {
        ...this.state.filterAndSort,
        filterText: text,
      },
      searchTimeout: searchTimeout,
      searchDispatched: false,
    });
  }

  onSortPressed() {
    let filterAndSort = Object.assign({}, this.state.filterAndSort);
    filterAndSort.sortType = (filterAndSort.sortType + 1) % MarketSortTypes.count;

    // TODO Change this to cycleSortMarkets()
    this.setState({filterAndSort: filterAndSort});
    this.props.actions.sortMarkets(filterAndSort);
  }

  render() {
    // TODO Fix this
    let sortNames = [
      'MarketCap',
      'Change',
      'Volume',
    ];
    //&#9660 &#9650

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
            value={this.state.filterAndSort.filterText}
            onBlur={() => this.dispatchSearch()}
            onChangeText={(text) => this.onSearchChanged(text)} />
        </View>

        <View style={styles.rightBar}>
          <View style={styles.borderButton}>
            <Text style={styles.text}>  All | Saved </Text>
          </View>
        </View>

        <TouchableHighlight underlayColor='black' onPress={() => this.onSortPressed()}>
          <View style={styles.rightBar2}>
            <Text style={styles.text}>
              {sortNames[this.state.filterAndSort.sortType]} &#9660;
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = storeState => ({
  filterAndSort: storeState.markets.filterAndSort
});
const mapDispatchToProps = dispatch => ({
  actions: {
    filterAndSortMarkets: (filterAndSort) => {
      dispatch(actions.filterAndSortMarkets(filterAndSort));
    },
    sortMarkets: (filterAndSort) => {
      dispatch(actions.sortMarkets(filterAndSort));
    },
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketsTopBar);
