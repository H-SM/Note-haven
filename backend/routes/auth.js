const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
//TESTING CHANGE OVER THE APPLICATION 
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
    const user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    res.send(user);
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