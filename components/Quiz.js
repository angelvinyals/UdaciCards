import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native';
import {white, gray, black, red,  green} from '../utils/colors'
import {STORAGE_KEY} from'../utils/_DATA';
import QuizView from './QuizView.js'

const questionItem = 2
const quizLength = 2
const question= { 
    key: 'keyquestion1', 
    title: 'Does React Native work with Android?', 
    answer: 'answer message',

  }

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz'
  }

  state = {
    isLoadingData:true,
    question: null,    
    questionNumber:0,
    quantityOfQuestions:0,
    questionsKeyArray: [],
    questionKeyToRender:'',
    
  };

  componentDidMount = async () => {
    console.log('QUIZ inside componentDidMount .............');
    const {keyDeck} = this.props.navigation.state.params 
    const decks =  await this.getKey(STORAGE_KEY)
    console.log('-.-.-.-.-.-after await this.getKey');

    if (decks !== null) {
      // We have data!!
      const deck= (JSON.parse(decks))[keyDeck]
      console.log(deck) 
      const questions= deck.questions
      console.log('questions: ', questions)
      const questionsKeyArray= Object.keys(questions)
      console.log('questionsKeyArray: ', questionsKeyArray)
      const quantityOfQuestions= questionsKeyArray.length      
      console.log('quantityOfQuestions', quantityOfQuestions)
      this.setState({         
        questions,
        questionsKeyArray,
        quantityOfQuestions,
      }) 
      this.getQuestion()
    } else {
      console.log('IMPORTANT : DECK NOT SAVED IN STATE COMPONENT'); 
    }       
  }

  async getKey(storageKey) {
    try {
      console.log('QUIZ inside getKey .............'); 
      console.log('-.-.-.-.-.-.getting data from AsyncStorage in QUIZ'); 
      const value = await AsyncStorage.getItem(storageKey);
      return value     
    } catch (error) {
      console.log("Error retrieving data from  getKey IN DeckList :" + error);
    }
  }

  getQuestion = () => {
    console.log('QUIZ inside getQuestion .............');
    const{questions, questionsKeyArray, questionNumber}= this.state
    const questionKeyToRender = questionsKeyArray.shift()
    console.log('questionKeyToRender: ', questionKeyToRender)
    const question= questions[questionKeyToRender]
    console.log('question', question) 
    this.setState((prevState, props) => ({
      isLoadingData: false,
      questionNumber: ++prevState.questionNumber,
      question,
      questionsKeyArray,
    }))
  }

  render() {
    console.log('QUIZ inside RENDER--------------------------');   

    if (this.state.isLoadingData) {
      console.log('-------------isLoadingData is :', this.state.isLoadingData)
      return <View><Text>Loading Data on QUIZ...</Text></View>;
    }
    console.log('-----------isLoadingData is :',this.state.isLoadingData)

    return <QuizView  
      question={this.state.question} 
      questionNumber= {this.state.questionNumber} 
      quantityOfQuestions={this.state.quantityOfQuestions}/>   
  }
}

export default Quiz;