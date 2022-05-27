const admin = require('firebase-admin');
const serviceAccountKey = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://e-dashboard-gt-default-rtdb.firebaseio.com"
});


module.exports.numeroTareasIncumplidas = async() => {
    const date = new Date();
    const snap = await admin.firestore().collection('todo').where("fecha_limite", "<", date).get();
    return snap;
};

//Peticiones de datos del usuario

module.exports.userData = async (uid) => {
    return await (await admin.firestore().collection('users').doc(uid).get()).data();
};

module.exports.userSession = async (sessionCookie) => {
    return await admin.auth().verifySessionCookie(sessionCookie, true);
};

module.exports.createSession = async (idToken, expiresIn) => {
    return await admin.auth().createSessionCookie(idToken, {expiresIn});
};

module.exports.createUserWithNameAndRol = (name,token, uid) => {
    const userDB = admin.firestore().collection('users');
            
    if(token === "@dm1n5ystem"){
    const user = userDB.doc(uid).set({
        admin: true, 
        name:name
    });
    }else{
    const user = userDB.doc(uid).set({
        admin: false,
        name: name
    });
    }
};

module.exports.createUserWithName = async (name,uid) =>{
   return admin.firestore().collection('users').doc(uid).set({
       name: name
   });
};

//crud tareas

module.exports.postTask =  async (task, user) => {
    return admin.firestore().collection('tasks').add({
        title: task.title,
        description: task.description,
        date: task.date,
        completed: task.completed,
        user: user
    });
}

function getLocalTime(){
    todayGMT = new Date();
    localDate = `${todayGMT.getFullYear()}-${todayGMT.getMonth()+1}-${todayGMT.getDate()}`;
    return new Date(localDate);
}

function checkStatus(date, status){
    const today = getLocalTime();
    const dateTask = new Date(date * 1000);
    if((today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())&& !status){
        return 'pendiente';
    }
    if(today > dateTask && !status){
        return "no completado";         
    }
    if(today < dateTask && !status){
        return "pendiente";
    }
    if((today < dateTask || today > dateTask) && status){
        return "completado";
    }
}

function createColorStatus(status){
    if(status === 'no completado'){
        return "#c0392b";
    }
    if(status === 'pendiente'){
        return '#2980b9';
    }
    if(status === 'completado'){
        return '#16a085';
    }
}

module.exports.getTask = async (uidUser) => {
    const {docs} =  await admin.firestore().collection('tasks').where('user', '==' , uidUser).get();

    return docs.map( doc => {
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

module.exports.getTaskDetail = async (idTask) => {
    const task = await admin.firestore().collection('tasks').doc(idTask).get();
    const taskData = task.data();
    const date = new Date(taskData.date * 1000);

    return {
        id: task.id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.completed,
        date: date
    }
};

module.exports.getTodaysTask = async (uidUser) => {
    const {docs} = await admin.firestore().collection('tasks').where('user', '==', uidUser).get();

    const todayTasks = docs.filter(doc => {
        const today = getLocalTime();
        const status = doc.data()['completed'];
        const dateTask = new Date(doc.data()['date'] * 1000);
        if((today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())&& !status){
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

module.exports.getIncompletedTaks = async (uidUser) => {
    const {docs} = await admin.firestore().collection('tasks').where('user', '==', uidUser).get();

    const incompletedTasks = docs.filter(doc => {
        const today = getLocalTime();
        const status = doc.data()['completed'];
        const dateTask = new Date(doc.data()['date'] * 1000);
        if(today > dateTask && !status && !(today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())){
            return doc;         
        }
    });

    return incompletedTasks.map( doc => {
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
    const {docs} = await admin.firestore().collection('tasks').where('user', '==', uidUser).get();
    
    const completedTask  = docs.filter(doc => {
        if(doc.data()['completed']){
            return doc;
        }
    });

    const incompletedTasks = docs.filter(doc => {
        const today = getLocalTime();
        const status = doc.data()['completed'];
        const dateTask = new Date(doc.data()['date'] * 1000);

        if(today > dateTask && !status && !(today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())){
            return doc;         
        }
    });

    const pendingTask = docs.filter(doc => {
        const today = getLocalTime();
        const status = doc.data()['completed'];
        const dateTask = new Date(doc.data()['date'] * 1000);

        if(((today.getFullYear() === dateTask.getFullYear() && today.getMonth() === dateTask.getMonth() && today.getDate() === dateTask.getUTCDate())&& !status) || (today < dateTask && !status)){
            return doc;
        }
    });

    const totalTasks = completedTask.length + incompletedTasks.length + pendingTask.length;
    const efficiency = (totalTasks === 0 && incompletedTasks.length === 0)? 0:((completedTask.length + pendingTask.length) * 100) / totalTasks;

    return {
        totalTasks: totalTasks,
        completed: completedTask.length,
        incompleted: incompletedTasks.length,
        pending: pendingTask.length,
        efficiency: efficiency
    };
};


module.exports.updateTask = async (idTask, taskUpdated, date, completed) => {
    return admin.firestore().collection('tasks').doc(idTask).update({
        title: taskUpdated.title,
        description: taskUpdated.description,
        date:date,
        completed: completed
    });
};

module.exports.deleteTask = async (idTask) => {
    return admin.firestore().collection('tasks').doc(idTask).delete();
};


