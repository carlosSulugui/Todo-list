import {addTodo, getTodo} from "./connection.js"


const add = document.getElementById("add")
const title = document.getElementById("title")
const description = document.getElementById("description")

add.addEventListener("submit", (e)=>{
    e.preventDefault()
    addTodo(title.value, description.value)
})



window.addEventListener("DOMContentLoaded", async (e) =>{
        e.preventDefault()
        getTodo()
})




