const {createSession, createUserWithName, postTask} = require('../firebase/firebaseAdmin');
const {starterCards} = require('./starterCards');
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
        const user = await  createUserWithName(name,uid);
        console.log(user);
        const cards = starterCards();
        const postWelcomeCard = await postTask(cards.welcome, uid);
        const postGetStartedCard = await postTask(cards.getStarted, uid);
       }
      
       
    }catch(error){
        console.log(error);
    }
};

controller.sessionLogOut = (req,res) => {
    res.clearCookie('session');
    res.redirect('/');
};


module.exports = controller;