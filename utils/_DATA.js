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
            {id:'React1', question: 'What is React?', answer: 'A library for managing user interfaces'},
            {id:'React2', question: 'Where do you make Ajax requests in React?', answer: 'The componentDidMount lifecycle event'},
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


export function saveDecks(decks) {
    AsyncStorage.setItem('mobileFlashcards:decks', JSON.stringify(decks));
}

export async function fetchDecks() {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('data = ', data)
        if (data !== null) {
            // We have data!!
            return JSON.parse(data);
        }
        return decks;
    } catch (error) {
        alert(err);
    }
}
