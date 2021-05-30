import 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import firebase from 'firebase/app';

//TODO: add login and private route
const config = {
  apiKey: "AIzaSyCZBuVWtXZ-_5S1G8hLpKwNHQmewhqmwKw",
  authDomain: "m-city-meydan.firebaseapp.com",
  databaseURL: "https://m-city-meydan-default-rtdb.firebaseio.com",
  projectId: "m-city-meydan", //for favorite page password authentication 
  storageBucket: "m-city-meydan.appspot.com",
  messagingSenderId: "868578351742",
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase, firebaseMatches, firebasePromotions,
    firebaseTeams, firebasePlayers, firebaseDB
}