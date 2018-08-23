import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import {white, gray, black, red, green, purple} from '../utils/colors'

import {STORAGE_KEY} from'../utils/_DATA';



class NewDeck extends Component { 

  static navigationOptions = {
    title: 'New Deck'
  }

  state:{
    title:'' 
  }

  handleTitleChange = title => this.setState({ title });

  handleSubmit = async() =>{
    console.log('NEWDECK: inside handleSubmit xxxxxxxxxxxxxxxx')
    const {title} = this.state
    const decks_delta= {
      [`deck${title}`]:{
        key: `deck${title}`,
        title: title,
        questions:{},
      }
    }

    console.log('decks_delta: ',decks_delta)
    
    await this.saveKey(STORAGE_KEY, decks_delta)
    
    console.log('after savekey')
    //this.props.navigation.state.params.onGoBack({ hasToUpdateParent: true })           
    this.props.navigation.navigate('DeckList',{ 
      hasToUpdateDeck: true 
    })
  }

  async saveKey(storageKey, decks_delta) {
    console.log('NEWDECK: inside saveKey xxxxxxxxxxxxxxxx')
    try {
      await AsyncStorage.mergeItem(storageKey, JSON.stringify(decks_delta));
      console.log('xxxxxxxxx after await')
      return
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
 
  render() {
    console.log('NEWDECK inside RENDER--------------------------');
    return (           
        <View style={styles.containerMain}>       
          <View style={styles.containerProps}>
            <Text style={styles.title}>What is the title of your new deck?</Text>
          </View>  
          <View style={styles.containerInput} >
            <TextInput
              style={styles.inputDeckTitle}
              placeholder= {'Please insert Deck Title'} 
              onChangeText={this.handleTitleChange}
            />
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={this.handleSubmit}
            >
              <Text style={[styles.buttonText,{color:white}]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
              
    );
  }
}

const styles = StyleSheet.create({
  questionNumber: {
    color:black,
    fontSize:18,
    padding:10,
  },
  containerMain: {
    flex: 1,    
    marginTop: 0,    
    backgroundColor: white,
  },
  containerInput: {
        
    justifyContent: 'center',
    margin:30, 
    backgroundColor: white,
    borderRadius:7,
    borderWidth: 2,
    borderColor: black,
  },
  containerProps: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  inputDeckTitle: {
    fontSize: 18,
    textAlign:'left',
    marginTop: 5,
    marginBottom: 5, 
    padding:6,  
    
  },
  containerButtons: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: white,
  },
  title: {    
    fontSize: 40,
    textAlign:'center',
    padding:20
  },

  buttonSubmit:{
    justifyContent: 'center',
    margin: 15,
    height:50, 
    width: 125,
    overflow:'hidden', 
    backgroundColor: black,
    borderRadius:5,
  },
  buttonText:{
    textAlign:'center',
    fontSize:18,
  }
});

export default NewDeck;