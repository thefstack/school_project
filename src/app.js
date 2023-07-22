const express=require('express');
const app=express();


const path=require("path");
const hbs=require('hbs');

const port= process.env.PORT || 8000;





const viewPath=path.join(__dirname,"../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");
const publicPath=path.join(__dirname,"../public");


app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicPath));

const router=require("./routers/router") //require router
// registering router
app.use(router);





app.listen(port,()=>{
    console.log(`Listening to the Server`);
    console.log(`http://192.168.154.216:8000`)
})