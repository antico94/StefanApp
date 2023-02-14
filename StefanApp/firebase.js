// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALVniT7G9RZIagSL7LQ7QFTx6QyjsCiWs",
  authDomain: "fir-auth-1fc21.firebaseapp.com",
  projectId: "fir-auth-1fc21",
  storageBucket: "fir-auth-1fc21.appspot.com",
  messagingSenderId: "596310538439",
  appId: "1:596310538439:web:6fc0fbeb4393e23de4a6e2"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
export {auth}
