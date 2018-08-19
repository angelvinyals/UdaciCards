import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {white, gray } from '../utils/colors'

import {fetchDecks} from '../utils/_DATA';

/*
const decks = [
  { key: 'key1', 
    title: 'udacicards', 
    questions: [

    ]},    
  { key: 'key2', 
    title: 'new deck',
    questions: [

    ]}
  ]
*/

class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks'
  }; 

  state = {
    decks: []
  };

  async componentDidMount() {
    let decks = await fetchDecks();
    this.setState({
        decks
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,          
          backgroundColor: "#CED0CE",

        }}
      />
    );
  }; 

  onPress = () => {
    this.props.navigation.navigate('DeckItem', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
  }

  render() {

    const{decks} = this.state

    return (            
      <FlatList          
        data={decks}
        contentContainerStyle={styles.container}
        renderItem={({item}) => 
          <View >
            <TouchableOpacity 
              style={styles.button}
              onPress={this.onPress}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.questionsLength}>{item.questions.length} cards</Text>
            </TouchableOpacity>
          </View>
        }
        ItemSeparatorComponent={this.renderSeparator}
      />     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,    
    backgroundColor: white,
  },
  button:{
    alignItems:'center',
    paddingTop: 50,
    paddingBottom: 50,
  },  
  title: {    
    fontSize: 30
  },
  questionsLength: {
    color: gray,
    fontSize: 20
  },
  
});

export default DeckList;
