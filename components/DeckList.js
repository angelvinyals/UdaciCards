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
    console.log('decks in componentDidMount: ',decks);

    if (decks !== null) {
      // We have data!!
      this.setState({ 
        isLoading: false,
        decks: JSON.parse(decks),
      })
    }
    
    
  }

  async getKey(storageKey) {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      console.log('after getKey...............................: ', JSON.parse(value)) 
      return value     
    } catch (error) {
      console.log("Error retrieving data from  getKey" + error);
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

  onPress = () => {   
    this.props.navigation.navigate('DeckItem')
  }

  render() {
    console.log('inside render method in DeckList.............');

    if (this.state.isLoading) {
      return <View><Text>Loading Decks on DeckList component...</Text></View>;
    }
    console.log('this.state: ', this.state);

    const{decks} = this.state   
    console.log('decks........: ', decks);
    const decksArray= Object.values(decks)
    console.log('decksArray: ', decksArray)

    return (            
      <FlatList          
        data={decksArray}
        contentContainerStyle={styles.container}
        renderItem={({item}) => 
          <View >
            <TouchableOpacity 
              style={styles.button}
              onPress={this.onPress}
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
