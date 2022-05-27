const {userData, getStatistics} = require('../firebase/firebaseAdmin');
const controller = {};

controller.index = async (req,res) => {
    const user = await userData(req.uid);
    const statistics = await getStatistics(req.uid);
    res.render('statistics', {name: user.name, statistics});
};

module.exports = controller;