/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

//import Icon from 'react-native-vector-icons/Entypo';
import Icon from '@expo/vector-icons/Entypo';

import styles from '../styles';
import * as actions from '../../actions/marketsActions';

const mapStoreToProps = (store) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {};
}

type MarketDetailsType = {
  navigation: {
    state: {
      params: Object
    }
  }
};

class MarketDetailsScreen extends React.Component<MarketDetailsType, void> {
  constructor(props) {
    super(props);
  }

  render() {
    let navParams = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <Text>Details: {navParams.item.id} {navParams.item.name}</Text>
      </SafeAreaView>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(MarketDetailsScreen);
