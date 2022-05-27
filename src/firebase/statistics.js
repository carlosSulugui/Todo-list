// const admin = require('firebase-admin');
// const serviceAccountKey = require('../serviceAccountKey.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey),
//     databaseURL: "https://e-dashboard-gt-default-rtdb.firebaseio.com"
// });


// module.exports.numeroTareasIncumplidas = async() => {
//     const date = new Date();
//     const snap = await admin.firestore().collection('todo').where("fecha_limite", "<", date).get();
//     return snap;
// };

//estadisticas


const getIncompletedTaks = async (uidUser) => {
    const {docs} = await admin.firestore().collection('tasks').where('user', '==', uidUser).get();

    const todayTasks = docs.filter(doc => {
        const today = getLocalTime();
        const status = doc.data()['completed'];
        const dateTask = new Date(doc.data()['date'] * 1000);
        if(today > dateTask && !status && !(today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())){
            return doc;         
        }
    });

    return todayTasks.map( doc => {
        const date = doc.data()['date'];
        const status = doc.data()['completed'];
        const statusTask = checkStatus(date,status);
        const colorStatus = createColorStatus(statusTask);

        return {
            id: doc.id,
            title: doc.data()['title'],
            status: statusTask,
            colorStatus: colorStatus
        }
    });
};

module.exports.getStatistics = async (uidUser) => {
    const incompletedTask = getIncompletedTaks(uidUser);

    return incompletedTask.length;
};