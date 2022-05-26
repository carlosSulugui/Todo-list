const taskDetailForm = document.getElementById('task-detail-form');
const idTask = taskDetailForm.children[0].value;


taskDetailForm.addEventListener('submit', e => {
    const date = document.getElementById('current-date').value;
    const currentDate = new Date(date) / 1000;
    const newDate = document.getElementById('new-date').value;
    const dateToTimestamp = new Date(newDate) / 1000;
    
    const taskUpdated = {
        title : document.getElementById('task-detail-title').value, 
        description : document.getElementById('description').value,
        currentDate: currentDate,
        newDate : dateToTimestamp,
        completed : document.getElementById('radio-completed').checked,
        incompleted : document.getElementById('radio-incompleted').checked
    }

    const request = fetch(`/updateTask/${idTask}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            "CSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        }, 
        body: JSON.stringify({taskUpdated})
    });


    if(request){
        alert('Actualizado correctamente!!');
    }else{
        alert('No se pudo actualizar!!');
    }

});

