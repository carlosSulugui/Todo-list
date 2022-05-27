const {userData, getTodaysTask} = require('../firebase/firebaseAdmin');
const controller = {};


controller.index = async (req,res) => {
    const user = await userData(req.uid);
    const tasks = await getTodaysTask(req.uid);
    const message = (tasks.length === 0)? 'No hay tareas para hoy':'';

    res.render('todays-task', {name: user.name, tasks, message});
};

module.exports = controller;