
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"

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
const name = document.getElementById("name")

form.addEventListener("submit", e =>{
  e.preventDefault()
  logIn(email.value, password.value, "signIn")
})

function logIn (email, password,typeForm){
  signInWithEmailAndPassword(auth, email, password)
  .then(({user}) => {
    const uid = user.uid;

    return user.getIdToken().then((idToken) => {
        return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({idToken, uid,typeForm}),
        });
    });
  })
  .then(() => {
    return signOutSession();
  })
  .then(() => {
    window.location.assign('/profile');
  });
  return false;
}

export function signOutSession(){
  signOut(auth);
}