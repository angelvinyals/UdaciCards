import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {white, gray, black } from '../utils/colors'

const item= { 
    key: 'key1', 
    title: 'udacicards', 
    questions: [
      
    ]}

class DeckItem extends Component {
  static navigationOptions = {
    title: `${item.title}`,
    headerStyle: {
      backgroundColor: black,
    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }; 


  render() {
    
    return (    
      <View style={styles.container}>        
        <View style={styles.deckprops}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.questionsLength}>{item.questions.length} cards</Text>
        </View>
        <View style={styles.deckbuttons}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.navigate('NewDeck')}
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

export default DeckItem;