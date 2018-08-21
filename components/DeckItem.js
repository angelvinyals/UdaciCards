import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Button
} from 'react-native';
import {white, gray, black } from '../utils/colors'
import {STORAGE_KEY, decks2} from'../utils/_DATA';

class DeckItem extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '...some title on DeckItem'),
      headerRight: <Button 
        title="test" 
        onPress={() => {
            navigation.state.params.onGoBack({'hasToUpdateParent': navigation.getParam('hasToUpdateParent')})            
            navigation.goBack()
          }          
        }
      />
    }
  };

  state = {
    isLoading:true,
    isUpdated:false,
    hasToUpdate:false,
    deck: null,
  };

  componentDidMount = async () => {
    console.log('DECKITEM inside componentDidMount .............');
    const {keyDeck} = this.props.navigation.state.params 
    const decks =  await this.getKey(STORAGE_KEY)
    console.log('-.-.-.-.-.-after await this.getKey');
    if (decks !== null) {
      // We have data!!
      const deck= JSON.parse(decks)[keyDeck]
      console.log('deck is: ', deck)
      this.setState({ 
        isLoading: false,
        hasToUpdate: false,
        deck,
      })
    } else {
      console.log('IMPORTANT : DECK NOT SAVED IN STATE COMPONENT'); 
    }
       
  }

  async getKey(storageKey) {
    try {
      console.log('DECKITEM inside getKey .............'); 
      console.log('-.-.-.-.-.-.getting data from AsyncStorage in DeckItem'); 
      const value = await AsyncStorage.getItem(storageKey);
      return value     
    } catch (error) {
      console.log("Error retrieving data from  getKey IN DeckList :" + error);
    }
  }

  updateState = async () => {
    console.log('DECKITEM inside updateState .............'); 
    const {keyDeck} = this.props.navigation.state.params 
    const decks =  await this.getKey(STORAGE_KEY)
    console.log('decks: ', decks);
    if (decks !== null) {
      // We have data!!
      //console.log('navigation params:', this.props.navigation.state.params)
      this.props.navigation.setParams({ hasToUpdateParent: true })
      //console.log('navigation params:', this.props.navigation.state.params)
      const deck= JSON.parse(decks)[keyDeck]
      console.log('deck is: ', deck)
     
      await this.setState({ 
        hasToUpdate : false,
        deck,
      })

    } else {
      console.log('IMPORTANT : DECK NOT SAVED IN STATE COMPONENT'); 
    }
       
  }

  onPressAddCard = () => { 
    console.log('DECKITEM inside onPressAddCard--------------------------');
    console.log('state.deck: ', this.state.deck)
    const {keyDeck} = this.props.navigation.state.params 
    this.props.navigation.navigate('NewQuestion',{
      keyDeck,
      title: this.state.deck.title,
      questions: this.state.deck.questions,
      questionsLength: Object.keys(this.state.deck.questions).length,
      onGoBack: (param) => this.refresh(param),
    })
  }

  refresh = ({hasToUpdateParent}) => {
    console.log('DEKCITEM: inside refresh .............');
    console.log('hasToUpdateParent: ', hasToUpdateParent)
    const hasToUpdate= hasToUpdateParent? hasToUpdateParent: false
    console.log('hastoUpdate:' , hasToUpdate)
    this.setState({hasToUpdate: hasToUpdate})  
  }


  render() { 
    console.log('DECKITEM inside RENDER--------------------------');
    const {keyDeck,fromNewQuestion} = this.props.navigation.state.params

    if (this.state.isLoading) {
      console.log('-------------isloading is :', this.state.isLoading)
      return <View><Text>Loading Deck on DeckItem component...</Text></View>;
    }
    console.log('-----------isloading is :', this.state.isLoading)

    if (this.state.hasToUpdate) {
      console.log('----------- hasToUpdate is:',this.state.hasToUpdate)
      this.updateState()
      return <View><Text>Updating DeckItem after submit a NewQuestion...</Text></View>;
    }

    console.log('----------- hasToUpdate is:', this.state.hasToUpdate)
    const {deck}= this.state
    const questionsLength = Object.keys(deck.questions).length

    console.log("------------finally render DeckItem")
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