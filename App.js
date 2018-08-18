import React from 'react'
import { StyleSheet, Button, View, Text, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'

import DeckList from './components/DeckList';
import DeckItem from './components/DeckItem';
import Quiz from './components/Quiz';


class NewDeckScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>New Deck view</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class NewQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>New Question view</Text>
      </View>
    );
  }
}

const MainNavigator  = createStackNavigator({
  DeckList: {
    screen: DeckList,
  },
  DeckItem: {
    screen: DeckItem,
  },
  Quiz: {
    screen: Quiz,
  },
  NewDeck: {
    screen: NewDeckScreen,
  },
  NewQuestion: {
    screen: NewQuestionScreen,
  },

});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

