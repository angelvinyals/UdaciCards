import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {white, gray } from '../utils/colors'

import {fetchDecks} from '../utils/_DATA';
import {STORAGE_KEY} from'../utils/_DATA';


class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks'
  }; 

  state = {
    isLoading:true,
    decks: null
  };

  componentDidMount = async () => {
    console.log('inside componentDidMount in DeckList.............');
    const decks =  await this.getKey(STORAGE_KEY)

    if (decks !== null) {
      // We have data!!
      this.setState({ 
        isLoading: false,
        decks: JSON.parse(decks),
      })
    } else {
      console.log('IMPORTANT : NOT DECKS SAVED IN STATE'); 
    }
       
  }

  async getKey(storageKey) {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      return value     
    } catch (error) {
      console.log("Error retrieving data from  getKey IN DeckList :" + error);
    }
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

  onPress = (keyDeck,title) => {   
    console.log('key passed to deckitems with navigate params from  DeckList: ', keyDeck)
    this.props.navigation.navigate('DeckItem',{
      keyDeck,
      title
    })
  }

  render() {
    console.log('inside render method in DeckList.............');

    if (this.state.isLoading) {
      return <View><Text>Loading Decks on DeckList component...</Text></View>;
    }

    const{decks} = this.state   
    const decksArray= Object.values(decks)

    return (            
      <FlatList          
        data={decksArray}
        contentContainerStyle={styles.container}
        renderItem={({item}) => 
          <View >
            <TouchableOpacity 
              style={styles.button}
              onPress={()=>this.onPress(item.key, item.title)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.questionsLength}>{Object.keys(item.questions).length} cards</Text>
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
