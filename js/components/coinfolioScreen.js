/* @flow */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class CoinfolioScreen extends React.Component<void, void> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>CoinfolioScreen</Text>
      </SafeAreaView>
    );
  }
}
