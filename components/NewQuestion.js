import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {white, gray, black, red, green, purple} from '../utils/colors'


class NewQuestion extends Component {
  static navigationOptions = {
    title: 'Add a Card'
  }

  state = {
    question: '',
    answer:'' 
  }  

  submit = () =>{
    console.log('submit')
  }
 
  render() {

    const {keyDeck,title,questionsLength} = this.props.navigation.state.params;

    const{question, answer} = this.state
    console.log('question in state component: ', question)
    console.log('answer in state component: ',  answer) 
    
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
              onChangeText={(question) => this.setState({question})}
            />
          </View>
          <View style={styles.containerInput} >
            <TextInput
              style={styles.inputDeckTitle}
              placeholder= {'input the answer'} 
              value={answer}
              onChangeText={(answer) => this.setState({answer})}
            />
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={this.submit}
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