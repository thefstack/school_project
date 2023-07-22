const mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/School').then(()=>{
    console.log("School Database Connected");
}).catch((e)=>{
    console.log("School Database Connection Failed");
});