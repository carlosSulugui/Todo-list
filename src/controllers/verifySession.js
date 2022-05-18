const {userSession} = require('../firebase/firebaseAdmin');

module.exports.isLogged = async (req,res,next) =>{
    const sessionCookie = req.cookies.session || "";

    try{
        const session = await userSession(sessionCookie);
        const uid = session.uid;
        req.uid = uid;
        next();
    }catch(error){
        res.redirect('/');
    }
};

module.exports.isUnlogged = async(req,res,next) =>{
    const sessionCookie = req.cookies.session || "";

    try{
        const session = await userSession(sessionCookie);
        res.redirect('/profile');
    }catch(error){
        console.log("parece que hubo un error o no estas logeado, te redireccionare a login");
        next();
    }
};
