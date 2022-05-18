// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword , updateProfile, signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"

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





const signUp = document.querySelector("#sign-up")
const email = document.getElementById("email")
const password = document.getElementById("password")
const name = document.getElementById("name")
signUp.addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log(email.value, password.value)
    createUser(email.value , password.value, name.value, "signUp")
})

function createUser(email , password, name, typeForm){
    createUserWithEmailAndPassword(auth , email, password)
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
                body: JSON.stringify({idToken, uid, name, typeForm}),
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