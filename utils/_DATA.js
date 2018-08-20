/**
 * inspired in https://raw.githubusercontent.com/MargaretaL/mobile-flashcards/master/utils/_DATA.js
 */

import {AsyncStorage} from 'react-native';

export const STORAGE_KEY = '@mobileFlashcards:decks';

export const decks ={
    deckReact: {
        key: 'deckReact',
        title: 'React',
        questions:{
            React1:{key:'React1', question: 'What is React?', answer: 'A library for managing user interfaces'},
            React2:{key:'React2', question: 'Where do you make Ajax requests in React?', answer: 'The componentDidMount lifecycle event'},
        },
    },
    deckJavaScript: {
        key: 'deckJavaScript',
        title: 'JavaScript',
        questions:{
            JavaScript1:{key:'JavaScript1', question: 'What is Javascript?', answer: 'A programming language.'},
            JavaScript2:{key:'JavaScript2', question: 'What was Javascript originally named?', answer: 'Mocha'},
            JavaScript3:{
                key:'JavaScript3',
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            },
        },
    },
}


export const saveDecksOld = async(decks) => {
    try{
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    }catch (error) {
        // Error retrieving data
        alert(err);
    }
    
}

export const saveDecks = async(decks_delta) => {
    try{
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks), () => {
                        AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks_delta));
                    });
        console.log('newDecks:', decks)         
    }catch (error) {
        // Error retrieving data
        alert(err);
    }
    
}

export const fetchDecks = async() => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('data = ', data)
        if (data !== null) {
            // We have data!!
            return JSON.parse(data);
        }
        return decks;
    } catch (error) {
        // Error retrieving data
        alert(err);
    }
}

export const saveNewQuestion = async(decks_delta) => {
    console.log('....inside saveNewQuestion IN DATA.JS')
    console.log('decks_delta: ',decks_delta)
    try{
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks2), () => {
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks_delta))
        });
        const result = await AsyncStorage.getItem(STORAGE_KEY)
        console.log('after AsyncStorage....................')
        console.log('result: ', result)
    }catch (error) {
        // Error retrieving data
        console.log('saveNewQuestion has launch an error',error);
    }
}
