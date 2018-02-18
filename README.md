# Coins React
Crypto markets

## Installation
Dependencies:
- Xcode 8.0 or newer
- Node 6.0 or newer

````
brew install watchman
brew install yarn

yarn global add react-native-cli
yarn install
````

- React: react, react-native, react-native-chart/victory-native, react-navigation, react-native-vector-icons
- Redux: redux, react-redux, redux-logger, redux-thunk
- Devtools: react-native-cli, react-devtools, babel-cli, babel-preset-flow, flow-bin

# Phylosophies

https://github.com/ModusCreateOrg/react-navigation-redux-sample
https://react.rocks/example/FinanceReactNative


- Try to have one reducer for everything until you need to split it
- Each screen should be connected to the store
- Components can have props passed from the screen (use spread operator)
- react-navigation allows parameters passing and querying (but we should avoid?)
  - this.props.navigation.state.params
