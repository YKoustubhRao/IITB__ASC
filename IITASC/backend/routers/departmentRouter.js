const express = require("express")

const router = express.Router();

const pool = require("../db");


router.route("/all").get(async (req,res) => {
    try{

        const getAllDepartment =await pool.query(
            `SELECT dept_name FROM department`
        );

        // console.log(getAllDepartment.rows);

        res.status(201).json({
            department: getAllDepartment.rows
        });

    }catch(err){
        res.status(400).json({
            error:err
        });
        console.log(err.message);
    }
});


router.route("/course").post(async (req,res) => {
    const {usn,semester} = req.body;
    console.log(usn);
    console.log(sem);

    try{

        const getAllCourses = await pool.query(
        `SELECT * 
            FROM course JOIN section USING(course_id)
            WHERE section_id = $1 and semester = $2`,[usn,semester]
        );

        console.log(getAllCourses.rows);
        res.status(201).json({
            courses: getAllCourses.rows,
        });

    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }

    


});



module.exports=router;