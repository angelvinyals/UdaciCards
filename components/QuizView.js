import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {white, gray, black, red,  green} from '../utils/colors'

class QuizView extends Component {  

  state = {
    isShowingQuestion: true,    
  };  

  handleToggle = ( ) =>{
    console.log('QUIZView inside TOGGLE.................')
    this.setState((prevState, props) => ({
      isShowingQuestion: !prevState.isShowingQuestion
    }));
  }
  
  handleAnswered =(data) => {
    console.log('QUIZView inside handleAnswered.................')
    console.log(data)

  }
 
  render() {
    console.log('QuizView inside RENDER--------------------------');   
    const {isShowingQuestion} = this.state
    console.log('isShowingQuestion:', isShowingQuestion)
    const {question, questionNumber, quantityOfQuestions}= this.props
    console.log('question: ', question)   
    console.log('-------------isShowingQuestion is :', isShowingQuestion)
    return (           
      <View style={styles.container}>
        <Text style={styles.questionNumber}>{questionNumber} / {quantityOfQuestions}</Text>         
        <View style={styles.containerProps}>
          <Text style={styles.title}>{isShowingQuestion? question.question : question.answer}</Text>
          <TouchableOpacity
            onPress={this.handleToggle}
          >
            <Text style={styles.answerOrQuestion}>{isShowingQuestion? 'answer' : 'question'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.buttonCorrect}
            onPress={() => this.handleAnswered('correct')}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIncorrect}
            onPress={() => this.handleAnswered('Incorrect')}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>            
    ) 
    console.log('-----------isloading is :', this.state.isLoading)
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
  containerProps: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  containerButtons: {
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
    color:white,
  }
});

export default QuizView;