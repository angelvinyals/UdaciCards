import React from 'react';
import { Button,View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class DeckListScreen extends React.Component {
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

const RootStack = createStackNavigator({
  DeckList: {
    screen: DeckListScreen,
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
    return <RootStack />;
  }
}
