const Employee =require('../Models/Employee');
const bcrypt =require('bcrypt');
const express= require('express');
const Router = express.Router();
const asyncvalidator =require('../Middleware/Async');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const myvalidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            msg: error.msg,
        };
    }
});
/**
 * @swagger
 *
 * /addemployee:
 *   post:
 *     description: employee to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: employee is added
 */
Router.post('/addemployee',[
    check('email','Email is Required').isEmail(),
    check('name','username should have min. 5 characters').isLength({min:5}),
],asyncvalidator(async (req,res)=>{
    const errors = myvalidationResult(req);
    if(!errors.isEmpty()) return res.status(422).json(errors.array());
    let user = await Employee.findOne({"email":req.body.email});
    if(user) return res.status(400).send([{msg:"Already have account"}]);

    user= new Employee({
        email:req.body.email,
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        DOB:req.body.DOB,
        address:req.body.address,
        role:req.body.role,
        experience:req.body.experience
    });
    
    await user.save();
    
    res.send("employee is added");

}));

Router.get('/employees',asyncvalidator(async function (req, res) {
    const employee = await Employee.find();
    res.send(employee);
}));

Router.get('/employee/:id',asyncvalidator(async function (req, res) {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
}));

module.exports=Router;
