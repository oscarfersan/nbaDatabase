const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyAmbMHUlhfriGjf0eu4saR-28nA0n0FCBE",
    authDomain: "nbaapp-f6374.firebaseapp.com",
    databaseURL: "https://nbaapp-f6374.firebaseio.com",
    projectId: "nbaapp-f6374",
    storageBucket: "nbaapp-f6374.appspot.com",
    messagingSenderId: "514949453366",
    appId: "1:514949453366:web:10ea2536ab74b451c5ea97",
    measurementId: "G-1TFNEC6LTR"

}
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleProvider();

export { auth, provider };
export default db;