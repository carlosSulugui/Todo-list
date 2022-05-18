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

module.exports.createUserWithName = (name,uid) =>{
    const userDB = admin.firestore().collection('users');

    const user = userDB.doc(uid).set({
        name: name
    });
};