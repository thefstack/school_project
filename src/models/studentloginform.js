const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


const studentschema=new mongoose.Schema({
    _id:{
        type:String,
    },
    password:{
        type:String  
    },
    name:{
        type:String,
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    phone1:{
        type:Number
    },
    phone2:{
        type:Number
    },
    blood:{
        type:String
    },
    email:{
        type:String
    },
    address1:{
        type:String,
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
    admissiondate:{
        type:String
    }
});

studentschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    
    next();
})


const Student=new mongoose.model('studentdata',studentschema);

module.exports=Student;