
const containerDrag = document.getElementById("container-drag")
const containerTodo = document.getElementById("drag-todo")
const containerProject = document.getElementById("container-project")

export const drag = (element)=>{
    containerDrag.addEventListener("dragover", e  =>{
        e.preventDefault()
    })
    containerDrag.addEventListener("drop", e =>{
        containerDrag.appendChild(element)
    })

    containerTodo.addEventListener("dragover", e  =>{
        e.preventDefault()
    })
    containerTodo.addEventListener("drop", e =>{
        containerTodo.appendChild(element)
    })

    containerProject.addEventListener("dragover", e  =>{
        e.preventDefault()
    })
    containerProject.addEventListener("drop", e =>{
        containerProject.appendChild(element)
    })
}