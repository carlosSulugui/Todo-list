const {numeroTareasIncumplidas} = require('../firebase/firebaseAdmin');

const script = numeroTareasIncumplidas()
.then((snap) => {
    console.log("Actualmente hay", snap.size, "tareas incumplidas");
});