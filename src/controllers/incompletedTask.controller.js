const {userData, getIncompletedTaks} = require('../firebase/firebaseAdmin');
const controller = {};

controller.index = async (req,res) => {
    const user = await userData(req.uid);
    const tasks = await getIncompletedTaks(req.uid);
    const message = (tasks.length === 0)? 'No hay tareas incumplidas':'';
    res.render('incompleted-task', {name: user.name, tasks, message});
};

module.exports = controller;