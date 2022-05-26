const form = document.getElementById('form-task');

form.addEventListener('submit', e => {
    e.preventDefault();

    const date = document.getElementById('add-task__date').value;
    const dateToTimestamp = new Date(date) / 1000;
    const task = {
        title: document.getElementById('add-task__title').value,
        description: document.getElementById('description').value,
        date: dateToTimestamp,
        completed: false
    };

    const request = fetch("/addTask", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify({task})
    });

    if(request){
        alert('Tarea agregada correctamente!!');
        window.location.reload();
    }
    if(!request){
        alert('Falló la creación de tarea');
        window.location.reload();
    }
});