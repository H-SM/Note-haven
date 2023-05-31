const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "HSM_HERE_:))";//this will be the signature over the token of JWT to authneticate our user and ensure the user doesnt changes aspects of the json while using the application

//create a user using : POST "/api/auth/createuser". doesnt require Auth ( authenitication ), No login required 
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
    // res.json(user);
    res.json({jwt_token});

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

//Authenticate a user using : POST "/api/auth/login". No login required 
router.post('/login',[
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const { email , password} = req.body;

    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error :"Check over your credentials again"});
        }
        const passwordCompare =await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error :"Check over your credentials again"});
        }
        const payload = { 
            user :{ 
                id : user.id
            }
        }
        const auth_token = jwt.sign(payload, JWT_SECRET);
        res.json({auth_token});
    }catch(err){
        console.error(err);
        res.status(500).send("INTERNAL SERVER ERROR : Some error occured");
    }

});


module.exports = router;