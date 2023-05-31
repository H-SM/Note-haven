const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "HSM_HERE_:))";//this will be the signature over the token of JWT to authneticate our user and ensure the user doesnt changes aspects of the json while using the application

//create a user using : POST "/api/auth". doesnt require Auth ( authenitication ), No login required 
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
  ],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try{
    const salt =await bcrypt.genSalt(10);//make up the salt
    const secPass =await bcrypt.hash(req.body.password, salt);

    const user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    });
    const data = { 
        user :{ 
            id : user.id
        }
    }
    const jwt_token = jwt.sign(data, JWT_SECRET);
    console.log(jwt_token);
    res.json(user);

    }catch(err){
        if(err.code=== 11000){
            //Duplicate key error 
            return res.status(400).json({error : "Email Already Exist"});
        }
        console.error(err);
        res.status(500).json({error : "server error", message : err.message});
        // we will send this error to logger or SQS not just showing it over the console
    }
});

module.exports = router;