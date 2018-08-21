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

import {STORAGE_KEY} from'../utils/_DATA';


class DeckList extends Component { 
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Decks'),
    };
  };

  state = {
    isLoading:true,
    decks: null,
    hasToUpdate:false,
  };

  componentDidMount = async () => {
    console.log('inside componentDidMount in DeckList.............');
    const decks =  await this.getKey(STORAGE_KEY)

    if (decks !== null) {
      // We have data!!
      this.setState({ 
        isLoading: false,
        decks: JSON.parse(decks),
      })
    } else {
      console.log('IMPORTANT : NOT DECKS SAVED IN STATE'); 
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

  updateState = async () => {
    console.log('DEKCLIST: inside updateState .............');
    const decks =  await this.getKey(STORAGE_KEY)
    console.log('decks: ', decks);
    if (decks !== null) {
      // We have data!!
      //console.log('navigation params:', this.props.navigation.state.params)
      //this.props.navigation.setParams({ hasToUpdateParent: true })
      //console.log('navigation params:', this.props.navigation.state.params)
      await this.setState({         
        decks:JSON.parse(decks),
        hasToUpdate : false,
      })
    } else {
      console.log('IMPORTANT : DECK NOT SAVED IN STATE COMPONENT'); 
    }
       
  }

  onGoDeckItem = (keyDeck,title) => { 
    console.log('DEKCLIST: inside onGoDeckItem .............');  
    console.log('navigated to DECKITEMS with this params: ', keyDeck , title)
    this.props.navigation.navigate('DeckItem',{
      keyDeck,
      title,
      onGoBack: (param) => this.refresh(param),
    })
  }

  refresh = ({hasToUpdateParent}) => {
    console.log('DEKCLIST: inside refresh .............');
    console.log('hasToUpdateParent: ', hasToUpdateParent)
    const hasToUpdate= hasToUpdateParent? hasToUpdateParent: false
    console.log('hastoUpdate:' , hasToUpdate)
    this.setState({hasToUpdate: hasToUpdate})  
  }

  render() {
    console.log('DEKCLIST: inside render........................');

    if (this.state.isLoading) {
      console.log('isLoading is :', this.state.isLoading)
      return <View><Text>Loading Decks on DeckList component...</Text></View>;
    }
    console.log('isLoading is :', this.state.isLoading)

    if (this.state.hasToUpdate) {
      console.log('----------- hasToUpdate is:',this.state.hasToUpdate)
      this.updateState()
      return <View><Text>Updating Decks on DeckList component...</Text></View>;
    }
    console.log('----------- hasToUpdate is:', this.state.hasToUpdate)


    const{decks} = this.state   
    const decksArray= Object.values(decks)

    console.log("finally render deck's list......")

    return (            
      <FlatList          
        data={decksArray}
        contentContainerStyle={styles.container}
        renderItem={({item}) => 
          <View >
            <TouchableOpacity 
              style={styles.button}
              onPress={()=>this.onGoDeckItem(item.key, item.title)}
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
