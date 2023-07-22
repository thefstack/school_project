const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://thefstackschool:thefstackRaj@cluster0.anosjwz.mongodb.net/School?retryWrites=true&w=majority').then(()=>{
    console.log("School Database Connected");
}).catch((e)=>{
    console.log("School Database Connection Failed");
});