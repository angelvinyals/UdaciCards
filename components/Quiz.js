import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import {white, gray, black, red,  green} from '../utils/colors'

const questionItem = 2
const quizLength = 2
const question= { 
    key: 'keyquestion1', 
    title: 'Does React Native work with Android?', 
    answer: 'answer message',
  }

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
    headerStyle: {
      backgroundColor: black,
    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  correct = () =>{
    console.log('correct')
  }

  incorrect = () =>{
    console.log('incorrect')
  }

  toggle = ( ) =>{
    console.log('toggle question and answer')
  }
 
  render() {
    
    return (           
        <View style={styles.container}>
          <Text style={styles.questionNumber}>{questionItem} / {quizLength}</Text>         
          <View style={styles.questionProps}>
            <Text style={styles.title}>{question.title}</Text>
            <TouchableOpacity
              onPress={this.correct}
            >
              <Text style={styles.answerOrQuestion}>Answer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questionButtons}>
            <TouchableOpacity
              style={styles.buttonCorrect}
              onPress={this.correct}
            >
              <Text style={[styles.buttonText,{color:white}]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonIncorrect}
              onPress={this.incorrect}
            >
              <Text style={[styles.buttonText,{color:white}]}>Incorrect</Text>
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
  container: {
    flex: 1,    
    marginTop: 0,    
    backgroundColor: white,
  },
  questionProps: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  questionButtons: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 2,
  },
  title: {    
    fontSize: 40,
    textAlign:'center',
    padding:20
  },
  answerOrQuestion: {
    color: red,
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonCorrect:{
    justifyContent: 'center',
    margin: 15,
    height:50, 
    width: 225,
    overflow:'hidden', 
    backgroundColor: green,
    borderRadius:5,
  },
   buttonIncorrect:{
    justifyContent: 'center',
    height:50, 
    width: 225,
    overflow:'hidden', 
    backgroundColor: red,
    borderRadius:5,
  },
  buttonText:{
    textAlign:'center',
    fontSize:18,
  }
});

export default Quiz;