const {deleteTask} = require('../firebase/firebaseAdmin');
const controller = {};

controller.deleteTask = async (req,res) => {
    const {id} = req.params;
    try{
        const removeTask = await deleteTask(id);
    }catch(error){
        console.log(error);
    }
};

module.exports = controller;