var jwt = require('jsonwebtoken');
const JWT_SECRET = "HSM_HERE_:))";

const fetchuser = (req,res ,next) =>{
    //GET the user from the jwt_token and add id 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenicate using a valid Token"});
    }
    try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    //got o the next function over the POST request
    next();
    } catch (error) {
        res.status(401).send({error : "Please authenicate using a valid Token"});
    }
    
}
module.exports = fetchuser;