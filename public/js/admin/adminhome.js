let students=document.querySelector('.students');
let teachers=document.querySelector('.teachers');
let viewstudent=false;
let viewteacher=false;
let studentclicked=document.getElementById('viewstudents');
let teacherclicked=document.getElementById('viewteachers');

students.addEventListener("click",()=>{
    if(viewstudent==false)
    {
        teacherclicked.style.display="none";
        viewteacher=false;
        studentclicked.style.display="block";
        viewstudent=true;
    }
    else{
        studentclicked.style.display="none";
        viewstudent=false;
    }
})
teachers.addEventListener("click",()=>{
    if(viewteacher==false)
    {
        studentclicked.style.display="none";
        viewstudent=false;
        teacherclicked.style.display="block";
        viewteacher=true;
    }
    else{
        teacherclicked.style.display="none";
        viewteacher=false;
    }
})

let addstudent=document.getElementById('addstudent');
addstudent.onclick=()=>{
    location="/admin/student/addstudent";
}
let updatestudent=document.getElementById('updatestudent');
updatestudent.onclick=()=>{
    location="/admin/student/updatestudent";
}
let removestudent=document.getElementById('removestudent');
removestudent.onclick=()=>{
    location="/admin/student/deletestudent";
}
let searchstudent=document.getElementById('searchstudent');
searchstudent.onclick=()=>{
    location="/admin/student/searchstudent";
}


// teachers 
let addteacher=document.getElementById('addteacher');
addteacher.onclick=()=>{
    location="/admin/teacher/addteacher";
}
let updateteacher=document.getElementById('updateteacher');
updateteacher.onclick=()=>{
    location="/admin/teacher/updateteacher";
}
let removeteacher=document.getElementById('removeteacher');
removeteacher.onclick=()=>{
    location="/admin/teacher/deleteteacher";
}
let searchteacher=document.getElementById('searchteacher');
searchteacher.onclick=()=>{
    location="/admin/teacher/searchteacher";
}
