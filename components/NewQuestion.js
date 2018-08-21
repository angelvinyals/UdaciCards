import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import {white, black} from '../utils/colors'
import {saveNewQuestion} from '../utils/_DATA';
import {STORAGE_KEY} from'../utils/_DATA'; 


class NewQuestion extends Component {
  static navigationOptions = {
    title: 'Add a Card'
  }

  state = {
    question: '',
    answer:'' 
  } 

  handleQuestionChange = question => this.setState({ question });

  handleAnswerChange = answer => this.setState({ answer });


  handleSubmit = async() =>{
    console.log('NEWQUESTION: inside handleSubmit xxxxxxxxxxxxxxxx')

    let { keyDeck, title, questionsLength, questions} = this.props.navigation.state.params;
    const newQuestion = this.state;    
    console.log('keyDeck: ', keyDeck)
    console.log('questionsLength:', questionsLength)
    const keyNewQuestion = `${title}${parseInt(questionsLength,10)+1}`
    newQuestion["key"]= keyNewQuestion
    console.log('new question: ', newQuestion)

    const decks_delta= {
      [keyDeck]:{
        questions:{
          [keyNewQuestion]:newQuestion
        }
      }
    }

    console.log('decks_delta: ',decks_delta)
    
    await this.saveKey(STORAGE_KEY, decks_delta)
    
    console.log('after savekey')
    this.props.navigation.state.params.onGoBack({ hasToUpdateParent: true })           
    this.props.navigation.navigate('DeckItem',{
      keyDeck
    })
  }

  async saveKey(storageKey, decks_delta) {
    console.log('NEWQUESTION: inside saveKey xxxxxxxxxxxxxxxx')
    try {
      await AsyncStorage.mergeItem(storageKey, JSON.stringify(decks_delta));
      console.log('xxxxxxxxx after await')
      return
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
 
  render() {
    console.log('NEWQUESTION: inside render xxxxxxxxxxxxxxxx')
    const { title} = this.props.navigation.state.params;
    console.log('navigation.state.params:', this.props.navigation.state.params)
    const { question, answer } = this.state
    
    return ( 

        <View style={styles.containerMain}>   
          <View style={styles.containerText} >    
            <Text style={styles.introMessage}> add a question to {title} deck</Text>  
          </View>
          <View style={styles.containerInput} >
            <TextInput
              style={styles.inputDeckTitle}
              placeholder= {'input the question'} 
              value={question}
              onChangeText={this.handleQuestionChange}
            />
          </View>
          <View style={styles.containerInput} >
            <TextInput
              style={styles.inputDeckTitle}
              placeholder= {'input the answer'} 
              value={answer}
              onChangeText={this.handleAnswerChange}
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

  introMessage: {
    color:black,
    fontSize:18,
    padding:10,
    alignItems: 'center',
  },
  containerMain: {
    flex: 1,    
    marginTop: 0,    
    backgroundColor: white,
  },
   containerText: {
    marginLeft:20,
  },
  containerInput: {        
    justifyContent: 'center',
    marginLeft:30, 
    marginRight:30, 
    marginTop: 5,
    marginBottom: 5, 
    backgroundColor: white,
    borderRadius:7,
    borderWidth: 2,
    borderColor: black,
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

export default NewQuestion;