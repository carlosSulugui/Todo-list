const {userData, getTaskDetail, updateTask} = require('../firebase/firebaseAdmin');
const controller = {};

controller.index = async(req,res) => {
    try{
        const user = await userData(req.uid);
        const { id } = req.params;
        const taskDetail = await getTaskDetail(id);
        res.render('edit-task', { name: user.name, taskDetail });    

    }catch(error){
        res.redirect('/');
    };
};

controller.updateTask = async (req,res) => {
    const taskUpdated = req.body.taskUpdated;
    const {id} = req.params;
   try{
       const date = (taskUpdated.newDate === null) ? taskUpdated.currentDate : taskUpdated.newDate;
       const completed = (taskUpdated.completed) ? true : false;
       const newTask = updateTask(id, taskUpdated, date, completed); 

       res.redirect('/');
   }catch(error){
       res.redirect('/');
   }
};

module.exports = controller;