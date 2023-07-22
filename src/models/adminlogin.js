const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const adminschema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    tokens:[{
        token:{
            type:String
        }

    }]
})

adminschema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

const admin=new mongoose.model('admindata',adminschema);

module.exports=admin;