import React from 'react'
import  {
  StyleSheet,
  View,
  Text
} from "react-native"
import {white, red} from '../utils/colors'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({  
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
});



const CongratulationsView = ({title}) => (
  	<View style={styles.container}>         
	    <View style={styles.containerProps}>
	    	<Text style={styles.title}>{title}</Text>         
	    	<Text style={styles.answerOrQuestion}>All questions correct</Text>          
	    </View>        
	</View>           
)

export default CongratulationsView

CongratulationsView.propTypes = { title: PropTypes.string }
CongratulationsView.defaultProps = { title: 'Congratulations!!' }