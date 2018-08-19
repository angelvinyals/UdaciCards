import React from 'react'
import { StyleSheet, Button, View, Text, StatusBar, Platform } from 'react-native'
import { createStackNavigator , createMaterialTopTabNavigator} from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white, black, lightGray} from './utils/colors'
import { Constants } from 'expo'

import DeckList from './components/DeckList'
import DeckItem from './components/DeckItem'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'


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
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
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

