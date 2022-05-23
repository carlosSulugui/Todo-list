const {userData, createSession, createUserWithName, postTask} = require('../firebase/firebaseAdmin');

const controller = {};

controller.sessionLogin = async (req,res) => {
    const idToken = req.body.idToken.toString();
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    try{
        const sessionCookie = await createSession(idToken, expiresIn);
        const options = {maxAge: expiresIn, httpOnly:true, secure:true};
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({status:"success"}));

       const typeForm = req.body.typeForm.toString();

       if(typeForm === "signUp"){
        const name = req.body.name.toString();
        const uid = req.body.uid.toString();
        createUserWithName(name,uid);
       }
      
       
    }catch(error){
        res.status(401).send("Unauthorized request!!");
    }
}

controller.profile = async (req,res) => {
    const user = await userData(req.uid);

    res.render('home', {name: user.name})
};

controller.addTask = async (req,res) => {
    const task = req.body.task;
    const post = await postTask(task,req.uid);
};

controller.sessionLogOut = (req,res) => {
    res.clearCookie('session');
    res.redirect('/');
};

module.exports = controller;