require('dotenv').config(); //this is for secrets we can store our secret in a folder with a name ".env" in root folder
const express = require("express");
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs'); 
const cookieParser=require('cookie-parser');
const auth=require("../middleware/auth");


//to store in database we need to access or require the model but here we just want to match the user name and password

//creating a new router
const router = new express.Router(); //to create a route

router.use(cookieParser());  //to use cookie parser we need to add it
router.use(express.json());  //to read json
router.use(express.urlencoded({ extended: false })); //use this to get/extract the data from input

//define router using router.get or post .....
router.get("/", (req, res) => {
    res.status(200).render('home');
})

router.get("/studentlogin", (req, res) => {
    res.status(200).render('studentlogin');
});
router.get("/teacherlogin", (req, res) => {
    res.status(200).render('teacherlogin');
});
router.get("/adminlogin", (req, res) => {
    res.status(200).render('adminlogin');
})



//admin router


// admin student router 
router.get('/admin/admin',auth,(req,res)=>{
    res.status(200).render('admin/admin');
})

router.get("/admin/student/addstudent",auth, (req, res) => {
    res.status(200).render('admin/student/addstudent');
})

router.get("/admin/student/addstudent",auth, (req, res) => {
    res.status(200).render('admin/student/addstudent');
})
router.get("/admin/student/updatestudent",auth, (req, res) => {
    res.status(200).render('admin/student/updatestudent');
})
router.get("/admin/student/deletestudent",auth, (req, res) => {
    res.status(200).render('admin/student/deletestudent');
})
router.get("/admin/student/searchstudent",auth, (req, res) => {
    res.status(200).render('admin/student/searchstudent');
})

// admin teacher router 
router.get("/admin/teacher/addteacher",auth, (req, res) => {
    res.render('admin/teacher/addteacher');
})
router.get("/admin/teacher/updateteacher",auth, (req, res) => {
    res.render('admin/teacher/updateteacher');
})
router.get("/admin/teacher/deleteteacher",auth,(req, res) => {
    res.render('admin/teacher/deleteteacher');
})
router.get("/admin/teacher/searchteacher",auth, (req, res) => {
    res.render('admin/teacher/searchteacher');
})

// admin router to logout 
router.get("/logout",auth,async(req,res)=>{
    try{
        
        console.log("cookies cleared")
        try{
            req.user.tokens= req.user.tokens.filter((index)=>{
                return index.token != req.token;
            })
        }catch(err){
            throw new Error("error");
        }
        res.clearCookie('jwt');
        await req.user.save();
        res.redirect(200,'home');
    }catch(err){
        console.log(err);
    }
})






router.get("*", (req, res) => {
    res.render('page404')
})


// admin login checking
router.post("/adminlogin", async (req, res) => {
    try {
        const admin = require('../models/adminlogin');
        const _id = req.body.adminid;
        const password = req.body.password;
        const adminid = await admin.findOne({ _id: _id });

        const isMatch= await bcrypt.compare(password,adminid.password);
        if (isMatch) {
            //generating token
            const token=await adminid.generateAuthToken();
        
            //storing cookies
            res.cookie('jwt',token,{
            httpOnly:true,
            expires:new Date(Date.now() + 1 * 60 * 60 * 1000),
            session:true
        });
            //if password match then redirect to admin/admin
            res.redirect('admin/admin');
        }
        else {
            res.status(401).redirect('adminlogin');
            throw new Error("Password Mismatch")
        }

    } catch (error) {
        res.status(400);
        res.send('Failed to login');
        console.log(error);
    }
})


// admin add student to database 
router.post("/admin/student/addstudent",auth, async (req, res) => {
    try {
        const student = require('../models/studentloginform');

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateobj = new Date(req.body.date);

        const _id = req.body.name.slice(0, 3).toUpperCase() + req.body.dob.slice(0, 4) + month + year;

        const addstudent = new student({
            _id: _id,
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            blood: req.body.blood,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            pincode: req.body.pincode,
            aadhar: req.body.aadhar,
            admissiondate: month + "/" + year,
            password: req.body.name.slice(0,4)+year+month
        })

        const addedstudent = await addstudent.save();

        res.status(201).render('admin/student/addstudent', { addstudent })

    } catch (error) {
        console.log("error in post method")
        console.log(error);
        res.status(501).render('admin/student/addstudent');
    }
})



// admin search student 
router.post("/admin/student/searchstudent",auth, async (req, res) => {
    try {
        const student = require('../models/studentloginform');
        const _id = req.body.id;
        if (_id.length == 0) {
            const searchstudent = await student.find();
            res.status(201).render('admin/student/searchstudent', { searchstudent })
        }
        else {
            const searchstudent = await student.findById({ _id: _id })
            if (searchstudent == null) {
                throw new Error("cannot find Id");
            }
            res.status(201).render('admin/student/searchstudent', { searchstudent })
        }


    } catch (err) {
        res.status(501).render('admin/student/searchstudent')
        console.log(err);
    }
})


// admin remove student from database 
router.post("/admin/student/deletestudent",auth, async (req, res) => {
    try {
        const student = require('../models/studentloginform');
        const _id = req.body.id;
        const searchstudent = await student.findByIdAndDelete({ _id });
        if (searchstudent == null) {
            throw new Error("cannot find Id");
        }
        res.status(201).render('admin/student/deletestudent', { _id })

    } catch (err) {
        res.status(501).render('admin/student/deletestudent',{err:"Id Does not Exist"})
        console.log(err);
    }
})

// admin update student 
router.post("/admin/student/updatestudent",auth, async (req, res) => {
    try {
        const student = require('../models/studentloginform');
        const _id = req.body.id;

        const data = await student.findById({ _id: _id })
        if (data == null) {
            throw new Error("cannot find id");
        }
        res.status(201).render('admin/student/updatestudent', { data })

    } catch (err) {
        res.status(404).render('admin/student/updatestudent')
        console.log(err);
    }
})
router.post("/admin/student/updatestudentdetails",auth, async (req, res) => {
    try {
        const student = require('../models/studentloginform');
        const _id = req.body.id;

        const data = await student.findByIdAndUpdate(_id, {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            blood: req.body.blood,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            pincode: req.body.pincode,
            aadhar: req.body.aadhar
        });
        if (data == null) {
            throw new Error("cannot find id");
        }
        const updatestudent = await data.save();
        res.status(201).render('admin/student/updatestudent',{update:true})

    } catch (error) {
        res.status(404).render('admin/student/updatestudent')
        console.log(error);
    }
})

// admin teacher
// admin add teacher to database 
router.post("/admin/teacher/addteacher",auth, async (req, res) => {
    try {
        const teacher = require('../models/teacherloginform');

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        const _id = req.body.name.slice(0, 3) + req.body.dob.slice(0, 4) + month + year;

        const addteacher = new teacher({
            _id: _id,
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            blood: req.body.blood,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            pincode: req.body.pincode,
            aadhar: req.body.aadhar,
            joiningdate: month + "/" + year
        })

        const addedteacher = await addteacher.save();
        console.log('saved to database');

        res.status(201).render('admin/teacher/addteacher',{addteacher})

    } catch (error) {
        console.log(error);
        res.status(501).render('admin/teacher/addteacher')
    }
})

// admin search teacher 
router.post("/admin/teacher/searchteacher",auth, async (req, res) => {
    try {
        const teacher = require('../models/teacherloginform');
        const _id = req.body.id;
        if (_id.length == 0) {
            const searchteacher = await teacher.find();
        console.log(searchteacher);

            res.status(201).render('admin/teacher/searchteacher',{searchteacher})
        }

        else {

            const searchteacher = await teacher.findById({ _id: _id })
            if (searchteacher == null) {
                throw new Error();
            }

            res.status(201).render('admin/teacher/searchteacher',{searchteacher})
        }


    } catch (error) {
        res.status(501).render('admin/teacher/searchteacher')
        console.log("Wrong Id");
    }
})


// admin remove teacher from database 
router.post("/admin/teacher/deleteteacher",auth, async (req, res) => {
    try {
        const teacher = require('../models/teacherloginform');
        const _id = req.body.id;


        const searchteacher = await teacher.findByIdAndDelete({ _id });
        if (searchteacher == null) {
            throw new Error();
        }
        res.status(201).render('admin/teacher/deleteteacher',{_id})

    } catch (error) {
        res.status(501).render('admin/teacher/deleteteacher')
        console.log("id does not exist");
    }
})

// admin update teacher 
router.post("/admin/teacher/updateteacher",auth, async (req, res) => {
    try {
        const teacher = require('../models/teacherloginform');
        const _id = req.body.id;

        const data = await teacher.findById({ _id: _id })
        if (data == null) {
            throw new Error("cannot find id");
        }
        res.status(201).render('admin/teacher/updateteacher', { data })

    } catch (error) {
        res.status(501).render('admin/teacher/updateteacher')
        console.log(error);
    }
})
router.post("/admin/teacher/updateteacherdetails",auth, async (req, res) => {
    try {
        const teacher = require('../models/teacherloginform');
        const _id = req.body.id;

        const data = await teacher.findByIdAndUpdate(_id, {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            blood: req.body.blood,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            pincode: req.body.pincode,
            aadhar: req.body.aadhar
        });
        if (data == null) {
            throw new Error("cannot find id");
        }
        const updatestudent = await data.save();
        res.status(201).render('admin/teacher/updateteacher',{update:true})

    } catch (error) {
        res.status(501).render('admin/teacher/updateteacher')
        console.log(error);
    }
})





//export the router and require in app js
module.exports = router;