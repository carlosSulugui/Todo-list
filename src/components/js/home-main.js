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

//Buscador reactivo

const search = document.getElementById('search');
const cards = document.querySelectorAll('.card');
let keyword = "";

search.addEventListener('keyup', e => {
    keyword = search.value;

    searchResult(keyword);
});

function searchResult(keyword){
    if(keyword === ""){
        cards.forEach(card => card.classList.remove('hidden-card'));
    }else{
        cards.forEach(card => {
            if(card.children[2].textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
                console.log(card.children[2].textContent);
                card.classList.remove('hidden-card');
            }else{
                card.classList.add('hidden-card');
            }
        });
    }
}
