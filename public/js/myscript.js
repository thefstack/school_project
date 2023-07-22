console.log("Myscript is connected");


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


ScrollReveal({ 
 
    distance: '100px',
    duration:1000,
    delay:100
});

ScrollReveal().reveal('.header-top h3', {origin:'top'});
ScrollReveal().reveal('.welcomecontainer .welcome,.missionandvalues, .mission p,.value,.footer p', {origin:'bottom'});
ScrollReveal().reveal('.right, .loginsignup', {origin:'right'});


const typed=new Typed('#multiple-text',{
    strings:['School',"Educational and Development Society"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});






gsap.to(".container",{
    backgroundColor:"#9AC5F4",
    scrollTrigger:{
        trigger:".missionandvalues",
        scroller:"body",
        start:"top 30%",
        end:"top 40%",
        scrub:true
    }
})
gsap.to(".mycontainerleft,.mycontainerright",{
    backgroundColor:"#99DBF5",
    scrollTrigger:{
        trigger:".missionandvalues",
        scroller:"body",
        start:"top 10%",
        end:"top 13%",
        scrub:true
    }
})








