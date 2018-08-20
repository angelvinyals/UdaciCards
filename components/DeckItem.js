import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {white, gray, black } from '../utils/colors'
import {STORAGE_KEY, decks2} from'../utils/_DATA';

class DeckItem extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '...some title on DeckItem'),
    };
  };

  state = {
    isLoading:true,
    deck: null
  };

  componentDidMount = async () => {
    console.log('inside componentDidMount in DeckItem.............');
    const {keyDeck} = this.props.navigation.state.params 
    const decks =  await this.getKey(STORAGE_KEY)

    if (decks !== null) {
      // We have data!!
      const deck= JSON.parse(decks)[keyDeck]
      console.log('deck is: ', deck)
      this.setState({ 
        isLoading: false,
        deck,
      })
    } else {
      console.log('IMPORTANT : DECK NOT SAVED IN STATE COMPONENT'); 
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

  onPressAddCard = () => { 
    const {keyDeck,title,questions} = this.props.navigation.state.params 
    this.props.navigation.navigate('NewQuestion',{
      keyDeck,
      title,
      questions,
      questionsLength: Object.keys(questions).length
    })
  }


  render() { 

    const {keyDeck} = this.props.navigation.state.params

    if (this.state.isLoading) {
      return <View><Text>Loading Deck on DeckItem component...</Text></View>;
    }
    
    const {deck}= this.state
    const questionsLength = Object.keys(deck.questions).length

    return (    
      <View style={styles.container}>        
        <View style={styles.deckprops}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.questionsLength}>{questionsLength} cards</Text>
        </View>
        <View style={styles.deckbuttons}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={this.onPressAddCard}
          >
            <Text style={[styles.buttonText,{color:black}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStartQuiz}
            onPress={() => this.props.navigation.navigate('Quiz')}
          >
            <Text style={[styles.buttonText,{color:white}]}>Start Quiz </Text>
          </TouchableOpacity>
        </View>
      </View>         
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    marginTop: 0,    
    backgroundColor: white,
  },
  deckprops: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  deckbuttons: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 2,
  },
  title: {    
    fontSize: 45,
    padding:10
  },
  questionsLength: {
    color: gray,
    fontSize: 28
  },
  buttonAdd:{
    justifyContent: 'center',
    margin: 15,
    height:60, 
    width: 200,
    overflow:'hidden', 
    backgroundColor: white,
    borderRadius:5,
    borderWidth: 1,
    borderColor: black,
  },
   buttonStartQuiz:{
    justifyContent: 'center',
    height:60, 
    width: 200,
    overflow:'hidden', 
    backgroundColor: black,
    borderRadius:6,
  },
  buttonText:{
    textAlign:'center',
    fontSize:18,
  }
});

export default DeckItem