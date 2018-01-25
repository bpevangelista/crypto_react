/* @flow */
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './styles';

export default class CoinfolioScreen extends React.Component<void, void> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>CoinfolioScreen</Text>
      </SafeAreaView>
    );
  }
}
