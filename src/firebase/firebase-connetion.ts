import firebase from "firebase"

export function initalizeFirebaseConnection(){
    const firebaseConfig = {
        apiKey: "AIzaSyDmbOctEmHKMrKbw8GT29S9OZcgKRZDLJM",
        authDomain: "adinex-beer.firebaseapp.com",
        databaseURL: "https://adinex-beer-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "adinex-beer",
        storageBucket: "adinex-beer.appspot.com",
        messagingSenderId: "642372549119",
        appId: "1:642372549119:web:35e6bd5ff00de45d93cfca",
        measurementId: "G-LMHRGCWTX7"
    }
    
    firebase.initializeApp(firebaseConfig)
}
