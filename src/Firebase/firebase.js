
import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJEOLoA_MXrWO6XmvCj-ZGtrEAt8ksKkk",
    authDomain: "whatsapp-clone-ef2ab.firebaseapp.com",
    projectId: "whatsapp-clone-ef2ab",
    storageBucket: "whatsapp-clone-ef2ab.appspot.com",
    messagingSenderId: "395180935430",
    appId: "1:395180935430:web:6e778c679ab6386266b687",
    measurementId: "G-S9VBWGCM5L"
};

//initialize
const app = firebase.initializeApp(firebaseConfig);

//db
const db = app.firestore();

//auth
const auth = firebase.auth();

//storage
const storage = firebase.storage();

//provider 
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

export { auth, providerFacebook, providerGoogle};

//to use db directly from firebase.js we export default
export default db;


  

