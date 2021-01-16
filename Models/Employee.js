const mongoose= require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{type:Number,
        required:true,
    },
    DOB:{
        type:Date,
        required:true},
    address:{
        city:{type:String},
        street:{type:String},
        country:{type:String}
    },
    role:{type:String},
    experience:{type:String},
    salary:{type:Number}

});

const Employee = mongoose.model('Employee',Schema);
module.exports =Employee;
