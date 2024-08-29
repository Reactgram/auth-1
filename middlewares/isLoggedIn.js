const User = require('../models/User');

const isLoggedIn = (req, res, next) => {
    let token = req.headers.authorization;

    if(token == null){
        return res.json({message: "User not found"});
    }
     
    User.findOne({token: token})
    .then(foundUser =>{
        if(foundUser == null){
            return res.json({message: "User not found"});
        }
        else{
            req.user = foundUser
            next()
         }
    })
}

module.exports = isLoggedIn;