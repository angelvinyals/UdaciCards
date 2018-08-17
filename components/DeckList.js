import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {white, gray } from '../utils/colors'


const decks = [
  { key: 'key1', title: 'udacicards', questions: [] },
  { key: 'key2', title: 'new deck'  , questions: [] }
  ]

class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks'
  }; 

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

  render() {
    
    return (            
      <FlatList          
        data={decks}
        contentContainerStyle={styles.container}
        renderItem={({item}) => 
          <View style={styles.flatview}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.questionsLength}>{item.questions.length} cards</Text>
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
  flatview: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 2,
  },
  title: {    
    fontSize: 30
  },
  questionsLength: {
    color: gray,
    fontSize: 20
  }  
});

export default DeckList;
