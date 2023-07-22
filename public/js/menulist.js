let menu=document.getElementById("menu");
var clicked=false;
menu.addEventListener("click",function(){
    if(clicked==false){
        clicked=true;
    document.getElementById('nav').style.display="flex";}
    else{
        clicked=false;
        document.getElementById('nav').style.display="none";
    }
})