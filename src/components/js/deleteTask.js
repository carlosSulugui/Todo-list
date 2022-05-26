cards.forEach(card => {

    const buttonDelete = card.children[3].children[0];
    const idTask = card.children[0].value;

    buttonDelete.addEventListener('click', e => {
        const dialog = confirm('Estás seguro que deseas eliminar la tarea?');

        if(dialog){            
            const request = fetch(`/deleteTask/${idTask}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    "CSRF-TOKEN": Cookies.get("XSRF-TOKEN")
                }, 
                body: null
            });

            if(request){
                alert("Se eliminó correctamente!!");
            }else{
                alert("Falló el proceso de eliminación!!");
            }
            window.location.reload();
        }
    });


})