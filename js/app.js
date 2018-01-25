/* @flow */
import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import AppWithRedux from './components/appNavigator'


class App extends React.Component<void, void> {
  render() {
    return (
      <Provider store={store}>
        <AppWithRedux />
      </Provider>
    );
  }
}

export default App;
