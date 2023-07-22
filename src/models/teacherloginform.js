const mongoose=require('mongoose');

const teacherschema=new mongoose.Schema({
    _id:{
        type:String,
    },
    password:{
        type:String  
    },
    name:{
        type:String,
        require: true
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    phone:{
        type:Number
    },
    blood:{
        type:String
    },
    email:{
        type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    pincode:{
        type:Number
    },
    aadhar:{
        type:Number
    },
    joiningdate:{
        type:String
    }
})

const Teacher=new mongoose.model('teacherdata',teacherschema);

module.exports=Teacher;