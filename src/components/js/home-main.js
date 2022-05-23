//Animación formulario de agregar tarea
const addTask = document.getElementById("add-task");
const addButton = document.getElementById('add-task-button');
const addTaskCloseButton = document.getElementById('add-task-close-button');
let isModalShow = false;

addButton.addEventListener('click', e => {
    e.preventDefault();
    if(!isModalShow){
        addTask.classList.add('hidden-add-task');
    }else{
        addTask.classList.remove('hidden-add-task');
    }

});

addTaskCloseButton.addEventListener('click', e => {
    e.preventDefault();
    addTask.classList.remove('hidden-add-task');
});