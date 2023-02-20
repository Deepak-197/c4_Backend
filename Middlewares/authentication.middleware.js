const jwt = require('jsonwebtoken');


function Authentication(req, res, next){
    const token = req.headers.authorization;

    jwt.verify(token, "socialpracticetoken", (err, decode) => {
        if(err){
            res.send({"msg": "Please Login First", "err":err.message})
        }else{
            req.body.userID = decode.userID
            next()
        }
    })
}

module.exports={
    Authentication
}