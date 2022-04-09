
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC13rknY6M-zDlAvTkZ_hnL6LQkyznpuRo",
  authDomain: "todo-app-12e32.firebaseapp.com",
  projectId: "todo-app-12e32",
  storageBucket: "todo-app-12e32.appspot.com",
  messagingSenderId: "444973727865",
  appId: "1:444973727865:web:5102d2486a54ed7a3514a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const form = document.querySelector("#login")
const email = document.querySelector("#email")
const password = document.querySelector("#password")




form.addEventListener("submit", e =>{
  e.preventDefault()
  logIn(email.value, password.value)
})


function logIn (email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then(user =>{
    console.log(user.user.uid)
  }).catch(error =>{ 
    console.log(error.message)
  })
}