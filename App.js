import React from 'react'
import { StyleSheet, Button, View, Text, StatusBar, Platform, AsyncStorage } from 'react-native'
import { createStackNavigator , createMaterialTopTabNavigator} from 'react-navigation'
import { purple, white, black, lightGray} from './utils/colors'
import { Constants } from 'expo'

import DeckList from './components/DeckList'
import DeckItem from './components/DeckItem'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import {STORAGE_KEY, decks} from'./utils/_DATA';


const TopTabs = createMaterialTopTabNavigator(
  {
    'DeckList': DeckList,
    'NewDeck': NewDeck,
  },
  {
    initialRouteName: 'DeckList',
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions:{
      activeTintColor:black,
      inactiveTintColor: lightGray,
      upperCaseLabel: true,
      labelStyle: {
        fontSize: 18,
      },
      style: {
        backgroundColor: white,
        elevation: 0,       //remove shadow on Android
        shadowOpacity: 0,   //remove shadow on iOS
      },
    }
  }
);


const MainNavigator  = createStackNavigator(
  {
    Home: {
      screen: TopTabs,
      navigationOptions: {
          header:null
      }
    },
    DeckItem: {
      screen: DeckItem,
    },
    Quiz: {
      screen: Quiz,
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
          header:null
      }
    },
    NewQuestion: {
      screen: NewQuestion,
    },
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: black,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
          width:0
        },
        elevation: 0,
        shadowRadius: 0,
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

export default class App extends React.Component {

  state = {
    isLoading: true
  }

  componentDidMount = async () => {
    console.log('inside componentDidMount on App.............');
    await this.resetKey(STORAGE_KEY, decks)
    this.setState({isLoading: false})
  }

  async resetKey(storageKey, objectToSave) {
    console.log('resetKey ...................................')
    console.log('storageKey: ', storageKey)
    console.log('decks : ', objectToSave)
    try {
      await AsyncStorage.removeItem(storageKey);
      console.log('after removeItem....')
      const value = await AsyncStorage.setItem(storageKey, JSON.stringify(objectToSave));
    } catch (error) {
      console.log("Error resetting data from  reset Key:" + error);
    }
  }


  render() {
    console.log('inside render method on App.............');

    if (this.state.isLoading) {
      return <View><Text>Loading Decks on App component...</Text></View>;
    }

    console.log('this.state.isLoading: ', this.state.isLoading);
    return (
      
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
     
    )
  }
}

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

