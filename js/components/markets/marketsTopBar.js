/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import * as actions from '../../actions/marketsActions';
import type { MarketsFilterAndSortType } from '../../types';

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
    height: 34,
    padding: 6,
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
  filterAndSort: MarketsFilterAndSortType,
  actions: {
    filterAndSortMarkets: (filterAndSort: MarketsFilterAndSortType) => void,
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
    let searchTimeout = setTimeout(() => this.dispatchSearch(), 500);

    this.setState({
      filterAndSort: {
        ...this.state.filterAndSort,
        filterText: text,
      },
      searchTimeout: searchTimeout,
      searchDispatched: false,
    });
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
            value={this.state.filterAndSort.filterText}
            onBlur={() => this.dispatchSearch()}
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
  filterAndSort: storeState.markets.filterAndSort
});
const mapDispatchToProps = dispatch => ({
  actions: {
    filterAndSortMarkets: (filterAndSort) => {
      dispatch(actions.filterAndSortMarkets(filterAndSort));
    },
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MarketsTopBar);
