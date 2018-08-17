import React from 'react'
import { StyleSheet, Button, View, Text, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'

import DeckList from './components/DeckList';

class DeckListScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks List',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Deck List view</Text>
        <Button
          title="Go to Individual Deck"
          onPress={() => this.props.navigation.navigate('IndividualDeck')}
        />
        <Button
          title="Go to Home-(deckList)"
          onPress={() => this.props.navigation.navigate('DeckList')}
        />
      </View>
    );
  }
}

class IndividualDeckScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Individual Deck view</Text>
        <Button
          title="Go to Quiz"
          onPress={() => this.props.navigation.navigate('Quiz')}
        />
        <Button
          title="Go to Home-(deckList)"
          onPress={() => this.props.navigation.navigate('DeckList')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class QuizScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Quiz view</Text>
        <Button
          title="Go to Home-(deckList)"
          onPress={() => this.props.navigation.navigate('DeckList')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

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
  IndividualDeck: {
    screen: IndividualDeckScreen,
  },
  Quiz: {
    screen: QuizScreen,
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

