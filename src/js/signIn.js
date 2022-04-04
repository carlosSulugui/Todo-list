

const form = document.querySelector("#login")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

const firebaseConfig = {
  apiKey: "AIzaSyA7E0dosIqg0oC8GlLgcHL95zhQ1m_hLkA",
  authDomain: "e-dashboard-gt.firebaseapp.com",
  projectId: "e-dashboard-gt",
  storageBucket: "e-dashboard-gt.appspot.com",
  messagingSenderId: "931283681392",
  appId: "1:931283681392:web:25d98340022b9558ea34b5"
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth()

form.addEventListener("submit",(e)=>{
  e.preventDefault()
  console.log(email.value , password.value)
  auth
    .createUserWihtEmailAndPassword(email.value, password.value)
})

