/**
 * inspired in https://raw.githubusercontent.com/MargaretaL/mobile-flashcards/master/utils/_DATA.js
 */

import {AsyncStorage} from 'react-native';

const STORAGE_KEY = 'mobileFlashcards:decks';

export const decks = [
    {
        key: 'decksReact',
        title: 'React',
        questions: [
            {key:'React1', question: 'What is React?', answer: 'A library for managing user interfaces'},
            {key:'React2', question: 'Where do you make Ajax requests in React?', answer: 'The componentDidMount lifecycle event'},
        ]
    },
    {
        key: 'decksJavaScript',
        title: 'JavaScript',
        questions: [

            {key:'JavaScript1', question: 'What is Javascript?', answer: 'A programming language.'},
            {key:'JavaScript2', question: 'What was Javascript originally named?', answer: 'Mocha'},
            {
                key:'JavaScript3',
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }

        ]
    },
];mobileFlashcards:decks


export const saveDecks = async(decks) => {
    try{
        awati AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
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

export const fetchDeck = async(key) => {
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
