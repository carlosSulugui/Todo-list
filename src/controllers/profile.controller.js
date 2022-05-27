const {userData,  postTask, getTask} = require('../firebase/firebaseAdmin');
const controller = {};

controller.profile = async (req,res) => {
    const user = await userData(req.uid);
    const tasks = await getTask(req.uid);
    res.render('home', {name: user.name, tasks})
};

controller.addTask = async (req,res) => {
    const task = req.body.task;
    const post = await postTask(task,req.uid);
};



module.exports = controller;