import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import { drag} from "./drag-drop.js"
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
const db = getFirestore(app)

const listTodo = []


// post for todo in firebase
export const addTodo = async (title, description) =>{
  try {
    if(title === "" && description == ""){
      alert("campos obligarotios")
    }else{
      const docRef = await addDoc(collection(db, "todo"),{
        title,
        description
      })
      console.log("document write wit id", docRef.id)  
    }
  } catch (error) {
   console.log("error", error) 
  }
}

export const getTodo = async () =>{
 const querySnapshot = await getDocs(collection(db, "todo"));
 if(querySnapshot !== null){
  let html  = ""
  const cardTodo = document.getElementById("drag-todo")
  querySnapshot.forEach(element => {
     const data = element.data()
     html += 
     `<div id="drag-drop" draggable="true">
         <div class="card-content">
           <p>${data.title}</p>
           <p>${data.description}</p>
         </div>             
     </div>
     ` 
   });
   cardTodo.innerHTML = html
   const card = document.querySelector("#drag-drop")
   drag(card)
 }else{
  console.log("data empty")
 }
}


