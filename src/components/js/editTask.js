cards.forEach( card => {

    const editButton = card.children[3].children[1];
    const idTask = card.children[0].value;

    editButton.addEventListener('click', e => {
        window.location.assign(`/editTask/${idTask}`);
    });

});

